import type { FC } from "react";
import { useCallback } from "react";

import { SelectOptionButton } from "../../select-option-button/components";
import { Eth } from "../../logo/components";

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

  const selectedAsset = isUseNativeData ? nativeData : tokenData;
  const optionAsset = isUseNativeData ? tokenData : nativeData;

  // eslint-disable-next-line react-perf/jsx-no-new-array-as-prop
  const options = [
    // TODO: remove ETH logo for real logos
    { id: optionAsset.symbol, logo: Eth, title: optionAsset.symbol },
  ];

  return (
    <SelectOptionButton
      isSmall
      logo={Eth}
      onOptionClick={handleOptionClick}
      options={options}
      title={selectedAsset.symbol}
    />
  );
};
