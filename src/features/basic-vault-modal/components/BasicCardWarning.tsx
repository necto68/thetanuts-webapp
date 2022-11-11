import { useBasicModalState } from "../hooks";
import { CardWarning } from "../../index-vault-modal/components/CardWarning";
import { useVaultModalState } from "../../modal/hooks";

export const BasicCardWarning = () => {
  const [{ vaultType }] = useVaultModalState();
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
      vaultType={vaultType}
    />
  );
};
