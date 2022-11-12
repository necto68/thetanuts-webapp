import { SwapInputCard } from "../../index-vault-modal/components/SwapInputCard";
import { useBasicModalState } from "../hooks";
import { TabType } from "../types";
import { useVaultModalState } from "../../modal/hooks";

export const InputCard = () => {
  const [vaultModalState] = useVaultModalState();
  const { tabType } = vaultModalState;

  const {
    inputValue,
    setInputValue,
    tokenData,
    isTokenDataLoading,
    nativeData,
    isNativeDataLoading,
    isUseNativeData,
    setIsUseNativeData,
    priceValue,
    remainderValue,
  } = useBasicModalState();

  return (
    <SwapInputCard
      inputValue={inputValue}
      isFlipped={false}
      isHideAssetSelector={tabType === TabType.withdraw}
      isHideWalletBalance={tabType === TabType.withdraw}
      isNativeDataLoading={isNativeDataLoading}
      isSource
      isTokenDataLoading={isTokenDataLoading}
      isUseNativeData={isUseNativeData}
      isValueLoading={isTokenDataLoading}
      nativeData={nativeData}
      onInputChange={setInputValue}
      onUseNativeDataChange={setIsUseNativeData}
      priceValue={priceValue}
      remainderValue={remainderValue}
      sourceTokenData={tokenData}
      tokenData={tokenData}
    />
  );
};
