import { SwapInputCard } from "../../index-vault-modal/components/SwapInputCard";
import { useBasicModalState } from "../hooks";

export const InputCard = () => {
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
