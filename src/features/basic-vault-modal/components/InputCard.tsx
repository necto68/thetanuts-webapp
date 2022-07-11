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
      isUseNativeData={false}
      isValueLoading={false}
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
