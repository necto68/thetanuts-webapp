import type { FC } from "react";
import { useCallback } from "react";

import { SelectOptionButton } from "../../select-option-button/components";

import type { SwapInputCardProps } from "./SwapInputCard";

type AssetSelectorProps = Pick<
  SwapInputCardProps,
  "isUseNativeData" | "nativeData" | "onUseNativeDataChange" | "tokenData"
>;

export const AssetSelector: FC<AssetSelectorProps> = ({
  isUseNativeData,
  nativeData,
  onUseNativeDataChange,
  tokenData,
}) => {
  const handleOptionClick = useCallback(() => {
    onUseNativeDataChange(!isUseNativeData);
  }, [onUseNativeDataChange, isUseNativeData]);

  if (!tokenData || !nativeData) {
    return null;
  }

  const { symbol: selectedAssetSymbol } = isUseNativeData
    ? nativeData
    : tokenData;

  const { symbol: optionAssetSymbol } = isUseNativeData
    ? tokenData
    : nativeData;

  const options = [
    {
      id: optionAssetSymbol,
      symbol: optionAssetSymbol,
      title: optionAssetSymbol,
    },
  ];

  return (
    <SelectOptionButton
      isSmall
      onOptionClick={handleOptionClick}
      options={options}
      symbol={selectedAssetSymbol}
      title={selectedAssetSymbol}
    />
  );
};
