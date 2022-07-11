import { SwapInputCard } from "../../index-vault-modal/components/SwapInputCard";

export const DepositInputCard = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const a = 1;
  return (
    <SwapInputCard
      inputValue="1"
      isFlipped={false}
      isNativeDataLoading
      isTokenDataLoading
      isUseNativeData={false}
      isValueLoading={false}
      nativeData={undefined}
      onInputChange={() => undefined}
      onUseNativeDataChange={() => undefined}
      priceValue={1}
      tokenData={undefined}
    />
  );
};
