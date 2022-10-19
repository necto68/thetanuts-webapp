import { useBasicModalState } from "../hooks";
import { CardWarning } from "../../index-vault-modal/components/CardWarning";

export const BasicCardWarning = () => {
  const { inputValue, tokenData, nativeData, isUseNativeData, remainderValue } =
    useBasicModalState();

  return (
    <CardWarning
      inputValue={inputValue}
      isFlipped={false}
      isSource
      isUseNativeData={isUseNativeData}
      nativeData={nativeData}
      remainderValue={remainderValue}
      sourceTokenData={tokenData}
      tokenData={tokenData}
    />
  );
};
