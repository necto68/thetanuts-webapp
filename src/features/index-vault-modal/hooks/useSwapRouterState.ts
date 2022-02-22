import { useCallback, useEffect, useState } from "react";
import type { Provider } from "@ethersproject/providers";
import Big from "big.js";
import { usePreviousImmediate } from "rooks";

import { RouterV2Abi__factory as RouterV2AbiFactory } from "../../contracts/types";
import { convertToBig } from "../../vault/helpers";
import { InputType } from "../types";

import { useTokenQuery } from "./useTokenQuery";
import { useNativeTokenQuery } from "./useNativeTokenQuery";

export const useSwapRouterState = (
  defaultSourceAddress: string,
  defaultTargetAddress: string,
  routerAddress: string,
  provider: Provider
) => {
  const [routerPath, setRouterPath] = useState([
    defaultSourceAddress,
    defaultTargetAddress,
  ]);

  useEffect(() => {
    setRouterPath([defaultSourceAddress, defaultTargetAddress]);
  }, [defaultSourceAddress, defaultTargetAddress]);

  const [sourceAddress, targetAddress] = routerPath;

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
    setRouterPath([targetAddress, sourceAddress]);
    setUseNativeDataValues([isUseNativeTargetData, isUseNativeSourceData]);

    if (lastUpdatedInputType === InputType.source) {
      setTargetValue(sourceValue);
    } else {
      setSourceValue(targetValue);
    }
  }, [
    sourceAddress,
    targetAddress,
    lastUpdatedInputType,
    sourceValue,
    setSourceValue,
    targetValue,
    setTargetValue,
    isUseNativeSourceData,
    isUseNativeTargetData,
  ]);

  const sourceTokenQuery = useTokenQuery(
    sourceAddress,
    routerAddress,
    provider
  );

  const targetTokenQuery = useTokenQuery(
    targetAddress,
    routerAddress,
    provider
  );

  const nativeTokenQuery = useNativeTokenQuery(routerAddress, provider);

  const { data: sourceData, isLoading: isSourceDataLoading } = sourceTokenQuery;
  const { data: targetData, isLoading: isTargetDataLoading } = targetTokenQuery;
  const { data: nativeData, isLoading: isNativeDataLoading } = nativeTokenQuery;

  const getOppositeValueForInput = useCallback(
    async (inputType: InputType) => {
      const inputValue =
        inputType === InputType.source ? sourceValue : targetValue;

      if (!inputValue || new Big(inputValue).lte(0)) {
        return "";
      }

      const routerContract = RouterV2AbiFactory.connect(
        routerAddress,
        provider
      );

      const defaultDivisor = new Big(10).mul(18);

      const { tokenDivisor = defaultDivisor } =
        (inputType === InputType.source ? sourceData : targetData) ?? {};

      const inputValueBigNumber = new Big(inputValue)
        .mul(tokenDivisor)
        .toString();

      if (inputType === InputType.source) {
        const amountsOut = await routerContract.getAmountsOut(
          inputValueBigNumber,
          routerPath
        );

        return convertToBig(amountsOut[1])
          .div(tokenDivisor)
          .round(5, Big.roundDown)
          .toString();
      }

      const amountsIn = await routerContract.getAmountsIn(
        inputValueBigNumber,
        routerPath
      );

      return convertToBig(amountsIn[0])
        .div(tokenDivisor)
        .round(5, Big.roundUp)
        .toString();
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

  useEffect(() => {
    const oppositeInputType =
      lastUpdatedInputType === InputType.source
        ? InputType.target
        : InputType.source;

    const [currentValue, previousValue] =
      lastUpdatedInputType === InputType.source
        ? [sourceValue, previousSourceValue]
        : [targetValue, previousTargetValue];

    if (currentValue !== previousValue && sourceAddress && targetAddress) {
      void (async () => {
        try {
          setIsOppositeInputValueLoading(true);

          const oppositeInputValue = await getOppositeValueForInput(
            lastUpdatedInputType
          );

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
    getOppositeValueForInput,
    updateInputsValues,
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

    swapInputs,

    tokensQueries: {
      sourceTokenQuery,
      targetTokenQuery,
      nativeTokenQuery,
    },
  };
};
