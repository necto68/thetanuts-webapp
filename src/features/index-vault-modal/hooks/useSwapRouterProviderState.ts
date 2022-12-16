import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Big from "big.js";
import { usePreviousImmediate } from "rooks";

import {
  DirectDepositorAbi__factory as DirectDepositorAbiFactory,
  RouterV2Abi__factory as RouterV2AbiFactory,
} from "../../contracts/types";
import { convertToBig } from "../../shared/helpers";
import type { SwapRouterState } from "../types";
import { InputType, ModalContentType } from "../types";
import { defaultSlippageToleranceValue } from "../constants";
import { useMiddleIndexPrice } from "../../index-vault/hooks";
import { useVaultModalState } from "../../modal/hooks";

import { useTokenQuery } from "./useTokenQuery";
import { useNativeTokenQuery } from "./useNativeTokenQuery";
import { useSwapRouterConfig } from "./useSwapRouterConfig";

const getPrices = (
  sourceValue: string,
  targetValue: string,
  assetPrice: number,
  indexPrice: number,
  isIndexTokenInTarget: boolean
) => {
  const sourceValueBig = new Big(sourceValue || 0);
  const targetValueBig = new Big(targetValue || 0);

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

  return {
    sourcePrice,
    targetPrice,
    priceImpactRate,
  };
};

const getTokensDivisors = async (
  inputType: InputType,
  sourceTokenQuery: ReturnType<typeof useTokenQuery>,
  targetTokenQuery: ReturnType<typeof useTokenQuery>
) => {
  const defaultDivisor = new Big(10).pow(18);

  const [inputQuery, outputQuery] =
    inputType === InputType.source
      ? [sourceTokenQuery, targetTokenQuery]
      : [targetTokenQuery, sourceTokenQuery];

  const [inputTokenData, outputTokenData] =
    inputQuery.isLoading || outputQuery.isLoading
      ? await Promise.all([inputQuery.refetch(), outputQuery.refetch()]).then(
          (queries) => queries.map(({ data }) => data)
        )
      : [inputQuery.data, outputQuery.data];

  const inputTokenDivisor = inputTokenData?.tokenDivisor ?? defaultDivisor;
  const outputTokenDivisor = outputTokenData?.tokenDivisor ?? defaultDivisor;

  return {
    inputTokenDivisor,
    outputTokenDivisor,
  };
};

export const useSwapRouterProviderState = (): SwapRouterState => {
  const [vaultModalState] = useVaultModalState();
  const {
    indexVaultAddress,
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    directDepositorAddress,
    directWithdrawalAddress,
    provider,
    indexVaultProvider,
    chainId,
    indexVaultQuery,
  } = useSwapRouterConfig();

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
    chainId: vaultChainId,
    assetPrice = 0,
    assetTokenAddress = "",
    totalRemainder = Number.MAX_SAFE_INTEGER,
  } = indexVaultQuery.data ?? {};

  const isUseIndexVaultChainId = vaultChainId === chainId;

  const previousChainId = usePreviousImmediate(chainId);

  // getting minInputValue and maxInputValue
  const minInputValue = 0;
  const maxInputValue = totalRemainder;

  // boolean flags for deposit mode
  const [isDirectModeBetterThanSwapMode, setIsDirectModeBetterThanSwapMode] =
    useState(false);

  const [isUseDirectMode, setIsUseDirectMode] = useState(false);

  // prices
  const middleIndexPriceQuery = useMiddleIndexPrice(
    assetPrice,
    defaultSourceAddress,
    defaultTargetAddress,
    routerAddress,
    provider
  );

  const middleIndexPrice = middleIndexPriceQuery.data ?? 0;

  const { sourcePrice, targetPrice, priceImpactRate } = getPrices(
    sourceValue,
    targetValue,
    assetPrice,
    middleIndexPrice,
    isIndexTokenInTarget
  );

  // slippage tolerance value
  const [slippageToleranceInputValue, setSlippageToleranceInputValue] =
    useState(defaultSlippageToleranceValue);

  const slippageToleranceValue =
    slippageToleranceInputValue || defaultSlippageToleranceValue;

  const previousSlippageToleranceValue = usePreviousImmediate(
    slippageToleranceValue
  );

  // timeout ref for debounce
  const timeoutReference = useRef<NodeJS.Timeout | null>(null);

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

  let spenderAddress = isUseDirectMode ? directDepositorAddress : routerAddress;

  if (vaultModalState.contentType === ModalContentType.withdraw) {
    spenderAddress = directWithdrawalAddress;
  }

  const directDepositorAssetTokenQuery = useTokenQuery(
    assetTokenAddress,
    directDepositorAddress,
    indexVaultProvider
  );

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

      // defaultAmountIn is equal to 99999999
      const defaultAmountIn = new Big("99999999");
      const defaultAmountOut = new Big(0);

      // getting token divisor
      const { inputTokenDivisor, outputTokenDivisor } = await getTokensDivisors(
        inputType,
        sourceTokenQuery,
        targetTokenQuery
      );

      const inputValueBigNumber = new Big(inputValue)
        .mul(inputTokenDivisor)
        .toString();

      if (inputType === InputType.source) {
        try {
          const amountOut = await routerContract
            .getAmountsOut(inputValueBigNumber, routerPath)
            .then((amountsOut) => convertToBig(amountsOut[1]));

          return amountOut.div(outputTokenDivisor).round(5, Big.roundDown);
        } catch {
          return defaultAmountOut;
        }
      }

      try {
        const amountIn = await routerContract
          .getAmountsIn(inputValueBigNumber, routerPath)
          .then((amountsIn) => convertToBig(amountsIn[0]));

        const amountInMultiplier = new Big(slippageToleranceValue)
          .div(100)
          .add(1);

        return amountIn
          .mul(amountInMultiplier)
          .div(outputTokenDivisor)
          .round(5, Big.roundUp);
      } catch {
        return defaultAmountIn;
      }
    },
    [
      sourceValue,
      targetValue,
      routerAddress,
      provider,
      sourceTokenQuery,
      targetTokenQuery,
      routerPath,
      slippageToleranceValue,
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

      // getting token divisor
      const { inputTokenDivisor, outputTokenDivisor } = await getTokensDivisors(
        inputType,
        directDepositorAssetTokenQuery,
        targetTokenQuery
      );

      const inputValueBigNumber = new Big(inputValue)
        .mul(inputTokenDivisor)
        .toString();

      if (inputType === InputType.source) {
        const amountOut = await directDepositorContract
          .estimateOutput(indexVaultAddress, inputValueBigNumber)
          .then(convertToBig);

        return amountOut.div(outputTokenDivisor).round(5, Big.roundDown);
      }

      const amountIn = await directDepositorContract
        .estimateInput(indexVaultAddress, inputValueBigNumber)
        .then(convertToBig);

      return amountIn.div(outputTokenDivisor).round(5, Big.roundUp);
    },
    [
      sourceValue,
      targetValue,
      isIndexTokenInTarget,
      directDepositorAddress,
      indexVaultProvider,
      directDepositorAssetTokenQuery,
      targetTokenQuery,
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

    const isInputValueChanged = currentValue !== previousValue;
    const isChainIdValueChanged = chainId !== previousChainId;
    const isSlippageToleranceValueChanged =
      lastUpdatedInputType === InputType.target &&
      slippageToleranceValue !== previousSlippageToleranceValue;

    const valuesHaveChanged =
      isInputValueChanged ||
      isChainIdValueChanged ||
      isSlippageToleranceValueChanged;

    const areTokensAddressesValid = sourceAddress && targetAddress;

    if (valuesHaveChanged && areTokensAddressesValid) {
      setIsOppositeInputValueLoading(true);

      // eslint-disable-next-line complexity
      const updateValues = async () => {
        try {
          setIsOppositeInputValueLoading(true);

          const [swapValue, directDepositValue] = await Promise.all([
            getSwapValueForOppositeInput(lastUpdatedInputType),
            getDirectDepositValueForOppositeInput(lastUpdatedInputType),
          ]);

          const isDirectDepositBetterThanSwap = Boolean(
            swapValue &&
              directDepositValue &&
              ((lastUpdatedInputType === InputType.source &&
                directDepositValue.gt(swapValue)) ||
                (lastUpdatedInputType === InputType.target &&
                  directDepositValue.lt(swapValue)))
          );

          const isUseDirectDeposit =
            isDirectDepositBetterThanSwap && isUseIndexVaultChainId;

          let oppositeInputValue = "";

          if (isUseDirectDeposit && directDepositValue) {
            oppositeInputValue = directDepositValue.toString();
          } else if (swapValue) {
            oppositeInputValue = swapValue.toString();
          } else {
            oppositeInputValue = "";
          }

          const currentMiddleIndexPrice = middleIndexPriceQuery.isLoading
            ? await middleIndexPriceQuery.refetch().then(({ data }) => data)
            : middleIndexPriceQuery.data;

          const { priceImpactRate: currentPriceImpactRate } = getPrices(
            lastUpdatedInputType === InputType.source
              ? sourceValue
              : oppositeInputValue,
            lastUpdatedInputType === InputType.source
              ? oppositeInputValue
              : targetValue,
            assetPrice,
            currentMiddleIndexPrice ?? 0,
            isIndexTokenInTarget
          );

          const isDirectDepositValid = Boolean(
            isDirectDepositBetterThanSwap &&
              directDepositValue &&
              swapValue &&
              currentMiddleIndexPrice &&
              directDepositValue
                .sub(swapValue)
                .mul(currentMiddleIndexPrice)
                .gt(100)
          );
          const isDirectWithdrawValid = currentPriceImpactRate < -10;

          const isDirectModeValid = isIndexTokenInTarget
            ? isDirectDepositValid
            : isDirectWithdrawValid;

          setIsUseDirectMode(isUseDirectDeposit);
          setIsDirectModeBetterThanSwapMode(isDirectModeValid);
          updateInputsValues(oppositeInputType, oppositeInputValue);
        } finally {
          setIsOppositeInputValueLoading(false);
        }
      };

      // debounce
      if (timeoutReference.current) {
        clearTimeout(timeoutReference.current);
      }

      timeoutReference.current = setTimeout(() => {
        void updateValues();
      }, 1000);
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
    slippageToleranceValue,
    previousSlippageToleranceValue,
    assetPrice,
    middleIndexPrice,
    middleIndexPriceQuery,
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

    minInputValue,
    maxInputValue,
    vaultChainId,

    slippageToleranceValue,
    slippageToleranceInputValue,
    setSlippageToleranceInputValue,

    isFlipped,
    swapInputs,

    tokensQueries: {
      sourceTokenQuery,
      targetTokenQuery,
      nativeTokenQuery,
    },
  };
};
