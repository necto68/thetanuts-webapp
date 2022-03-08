import { useCallback, useEffect, useMemo, useState } from "react";
import type { Provider } from "@ethersproject/providers";
import Big from "big.js";
import { usePreviousImmediate } from "rooks";

import {
  DirectDepositorAbi__factory as DirectDepositorAbiFactory,
  RouterV2Abi__factory as RouterV2AbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../vault/helpers";
import { InputType } from "../types";
import type { ChainId } from "../../wallet/constants";

import { useTokenQuery } from "./useTokenQuery";
import { useNativeTokenQuery } from "./useNativeTokenQuery";
import type { useSwapRouterConfig } from "./useSwapRouterConfig";

export const useSwapRouterState = (
  indexVaultAddress: string,
  defaultSourceAddress: string,
  defaultTargetAddress: string,
  routerAddress: string,
  directDepositorAddress: string,
  provider: Provider,
  indexVaultProvider: Provider,
  chainId: ChainId,
  indexVaultQuery: ReturnType<typeof useSwapRouterConfig>["indexVaultQuery"]
  // eslint-disable-next-line sonarjs/cognitive-complexity
) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const routerPath = useMemo(
    () =>
      isFlipped
        ? [defaultTargetAddress, defaultSourceAddress]
        : [defaultSourceAddress, defaultTargetAddress],
    [isFlipped, defaultSourceAddress, defaultTargetAddress]
  );

  const [sourceAddress, targetAddress] = routerPath;

  const isIndexTokenInTarget = defaultSourceAddress === sourceAddress;

  // input values
  const [inputsValues, setInputsValues] = useState({
    [InputType.source]: "1",
    [InputType.target]: "",
  });

  const sourceValue = inputsValues[InputType.source];
  const targetValue = inputsValues[InputType.target];

  const sourceValueBig = new Big(sourceValue || 0);
  const targetValueBig = new Big(targetValue || 0);

  const previousSourceValue = usePreviousImmediate(sourceValue);
  const previousTargetValue = usePreviousImmediate(targetValue);

  // use native data values
  const [useNativeDataValues, setUseNativeDataValues] = useState([
    false,
    false,
  ]);

  const [isUseNativeSourceData, isUseNativeTargetData] = useNativeDataValues;

  // last updated input type
  const [lastUpdatedInputType, setLastUpdatedInputType] = useState(
    InputType.source
  );

  const [isOppositeInputValueLoading, setIsOppositeInputValueLoading] =
    useState(false);

  // is value loading
  const isSourceValueLoading =
    isOppositeInputValueLoading && lastUpdatedInputType === InputType.target;
  const isTargetValueLoading =
    isOppositeInputValueLoading && lastUpdatedInputType === InputType.source;

  // getting isUseIndexVaultChainId
  const {
    chainId: indexVaultChainId = 0,
    assetPrice = 0,
    indexPrice = 0,
  } = indexVaultQuery.data ?? {};

  const isUseIndexVaultChainId = indexVaultChainId === chainId;

  const previousChainId = usePreviousImmediate(chainId);

  // boolean flags for deposit mode
  const [isDirectModeBetterThanSwapMode, setIsDirectModeBetterThanSwapMode] =
    useState(false);

  const [isUseDirectMode, setIsUseDirectMode] = useState(false);

  // prices
  const sourcePriceBig = sourceValueBig.mul(
    isIndexTokenInTarget ? assetPrice : indexPrice
  );
  const targetPriceBig = targetValueBig.mul(
    isIndexTokenInTarget ? indexPrice : assetPrice
  );

  const priceImpactRate = sourcePriceBig.gt(0)
    ? targetPriceBig
        .sub(sourcePriceBig)
        .div(sourcePriceBig)
        .mul(100)
        .round(2)
        .toNumber()
    : 0;

  const sourcePrice = sourcePriceBig.round(2).toNumber();
  const targetPrice = targetPriceBig.round(2).toNumber();

  // state updaters
  const updateInputsValues = useCallback(
    (inputType: InputType, value: string) => {
      setInputsValues((previousState) => ({
        ...previousState,
        [inputType]: value,
      }));
    },
    []
  );

  const updateUseNativeDataValues = useCallback(
    (inputType: InputType, value: boolean) => {
      setUseNativeDataValues((previousUseNativeDataValues) => {
        const [previousUseSourceNativeData, previousUseTargetNativeData] =
          previousUseNativeDataValues;

        return [
          inputType === InputType.source ? value : previousUseSourceNativeData,
          inputType === InputType.target ? value : previousUseTargetNativeData,
        ];
      });
    },
    []
  );

  const setSourceValue = useCallback(
    (inputValue: string) => {
      setLastUpdatedInputType(InputType.source);
      updateInputsValues(InputType.source, inputValue);
    },
    [updateInputsValues]
  );

  const setTargetValue = useCallback(
    (inputValue: string) => {
      setLastUpdatedInputType(InputType.target);
      updateInputsValues(InputType.target, inputValue);
    },
    [updateInputsValues]
  );

  const setUseSourceNativeData = useCallback(
    (value: boolean) => {
      setSourceValue("1");
      updateUseNativeDataValues(InputType.source, value);
    },
    [setSourceValue, updateUseNativeDataValues]
  );

  const setUseTargetNativeData = useCallback(
    (value: boolean) => {
      setTargetValue("1");
      updateUseNativeDataValues(InputType.target, value);
    },
    [setTargetValue, updateUseNativeDataValues]
  );

  const swapInputs = useCallback(() => {
    setIsFlipped((previousIsFlipped) => !previousIsFlipped);
    setUseNativeDataValues([isUseNativeTargetData, isUseNativeSourceData]);

    if (lastUpdatedInputType === InputType.source) {
      setTargetValue(sourceValue);
    } else {
      setSourceValue(targetValue);
    }
  }, [
    lastUpdatedInputType,
    sourceValue,
    setSourceValue,
    targetValue,
    setTargetValue,
    isUseNativeSourceData,
    isUseNativeTargetData,
  ]);

  const spenderAddress = isUseDirectMode
    ? directDepositorAddress
    : routerAddress;

  const sourceTokenQuery = useTokenQuery(
    sourceAddress,
    spenderAddress,
    provider
  );

  const targetTokenQuery = useTokenQuery(
    targetAddress,
    spenderAddress,
    provider
  );

  const nativeTokenQuery = useNativeTokenQuery(routerAddress, provider);

  const { data: sourceData, isLoading: isSourceDataLoading } = sourceTokenQuery;
  const { data: targetData, isLoading: isTargetDataLoading } = targetTokenQuery;
  const { data: nativeData, isLoading: isNativeDataLoading } = nativeTokenQuery;

  const getSwapValueForOppositeInput = useCallback(
    async (inputType: InputType) => {
      const inputValue =
        inputType === InputType.source ? sourceValue : targetValue;

      if (!inputValue || new Big(inputValue).lte(0)) {
        return null;
      }

      const routerContract = RouterV2AbiFactory.connect(
        routerAddress,
        provider
      );

      const defaultDivisor = new Big(10).pow(18);

      const { tokenDivisor = defaultDivisor } =
        (inputType === InputType.source ? sourceData : targetData) ?? {};

      const inputValueBigNumber = new Big(inputValue)
        .mul(tokenDivisor)
        .toString();

      if (inputType === InputType.source) {
        const amountOut = await routerContract
          .getAmountsOut(inputValueBigNumber, routerPath)
          .then((amountsOut) => convertToBig(amountsOut[1]));

        return amountOut.div(tokenDivisor).round(5, Big.roundDown);
      }

      const amountIn = await routerContract
        .getAmountsIn(inputValueBigNumber, routerPath)
        .then((amountsIn) => convertToBig(amountsIn[0]));

      return amountIn.div(tokenDivisor).round(5, Big.roundUp);
    },
    [
      routerAddress,
      provider,
      sourceValue,
      sourceData,
      targetValue,
      targetData,
      routerPath,
    ]
  );

  const getDirectDepositValueForOppositeInput = useCallback(
    async (inputType: InputType) => {
      const inputValue =
        inputType === InputType.source ? sourceValue : targetValue;

      if (!inputValue || new Big(inputValue).lte(0) || !isIndexTokenInTarget) {
        return null;
      }

      const directDepositorContract = DirectDepositorAbiFactory.connect(
        directDepositorAddress,
        indexVaultProvider
      );

      const defaultDivisor = new Big(10).pow(18);

      const { tokenDivisor = defaultDivisor } =
        (inputType === InputType.source ? sourceData : targetData) ?? {};

      const inputValueBigNumber = new Big(inputValue)
        .mul(tokenDivisor)
        .toString();

      if (inputType === InputType.source) {
        const amountOut = await directDepositorContract
          .estimateOutput(indexVaultAddress, inputValueBigNumber)
          .then(convertToBig);

        return amountOut.div(tokenDivisor).round(5, Big.roundDown);
      }

      const amountIn = await directDepositorContract
        .estimateInput(indexVaultAddress, inputValueBigNumber)
        .then(convertToBig);

      return amountIn.div(tokenDivisor).round(5, Big.roundUp);
    },
    [
      sourceValue,
      targetValue,
      isIndexTokenInTarget,
      directDepositorAddress,
      indexVaultProvider,
      sourceData,
      targetData,
      indexVaultAddress,
    ]
  );

  useEffect(() => {
    const oppositeInputType =
      lastUpdatedInputType === InputType.source
        ? InputType.target
        : InputType.source;

    const [currentValue, previousValue] =
      lastUpdatedInputType === InputType.source
        ? [sourceValue, previousSourceValue]
        : [targetValue, previousTargetValue];

    const valuesHaveChanged =
      currentValue !== previousValue || chainId !== previousChainId;

    if (valuesHaveChanged && sourceAddress && targetAddress) {
      // eslint-disable-next-line complexity
      void (async () => {
        try {
          setIsOppositeInputValueLoading(true);

          const [swapValue, directDepositValue] = await Promise.all([
            getSwapValueForOppositeInput(lastUpdatedInputType),
            getDirectDepositValueForOppositeInput(lastUpdatedInputType),
          ]);

          const isDirectDepositValid = Boolean(
            swapValue &&
              directDepositValue &&
              ((lastUpdatedInputType === InputType.source &&
                directDepositValue.gt(swapValue)) ||
                (lastUpdatedInputType === InputType.target &&
                  directDepositValue.lt(swapValue)))
          );

          const isDirectWithdrawValid = priceImpactRate < -10;

          const isUseDirectDeposit =
            isDirectDepositValid && isUseIndexVaultChainId;

          const isDirectModeValid = isIndexTokenInTarget
            ? isDirectDepositValid
            : isDirectWithdrawValid;

          let oppositeInputValue = "";

          if (isUseDirectDeposit && directDepositValue) {
            oppositeInputValue = directDepositValue.toString();
          } else if (swapValue) {
            oppositeInputValue = swapValue.toString();
          } else {
            oppositeInputValue = "";
          }

          setIsUseDirectMode(isUseDirectDeposit);
          setIsDirectModeBetterThanSwapMode(isDirectModeValid);
          updateInputsValues(oppositeInputType, oppositeInputValue);
        } finally {
          setIsOppositeInputValueLoading(false);
        }
      })();
    }
  }, [
    lastUpdatedInputType,
    previousSourceValue,
    sourceValue,
    previousTargetValue,
    targetValue,
    sourceAddress,
    targetAddress,
    getSwapValueForOppositeInput,
    getDirectDepositValueForOppositeInput,
    updateInputsValues,
    isUseIndexVaultChainId,
    previousChainId,
    chainId,
    isIndexTokenInTarget,
    priceImpactRate,
  ]);

  return {
    sourceValue,
    targetValue,

    setSourceValue,
    setTargetValue,

    isSourceValueLoading,
    isTargetValueLoading,

    sourceData,
    targetData,
    nativeData,

    isSourceDataLoading,
    isTargetDataLoading,
    isNativeDataLoading,

    setUseSourceNativeData,
    setUseTargetNativeData,

    isUseNativeSourceData,
    isUseNativeTargetData,

    lastUpdatedInputType,

    isDirectModeBetterThanSwapMode,
    isUseDirectMode,

    sourcePrice,
    targetPrice,
    priceImpactRate,

    isFlipped,
    swapInputs,

    tokensQueries: {
      sourceTokenQuery,
      targetTokenQuery,
      nativeTokenQuery,
    },
  };
};
