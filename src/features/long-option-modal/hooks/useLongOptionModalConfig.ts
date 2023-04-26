import { useVaultModalState } from "../../modal/hooks";
import { useBasicModalState } from "../../basic-vault-modal/hooks";

import { useLongOptionReader } from "./useLongOptionReader";
import { useLongOptionClosePositionReader } from "./useLongOptionClosePositionReader";

export const useLongOptionModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();
  const { inputValue } = useBasicModalState();

  const longOptionReaderQuery = useLongOptionReader(vaultId, inputValue);
  const longOptionClosePositionReaderQuery = useLongOptionClosePositionReader(
    vaultId,
    inputValue
  );

  return {
    longOptionReaderQuery,
    longOptionClosePositionReaderQuery,
  };
};
