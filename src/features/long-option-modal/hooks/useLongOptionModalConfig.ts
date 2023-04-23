import { useVaultModalState } from "../../modal/hooks";
import { useBasicModalState } from "../../basic-vault-modal/hooks";

import { useLongOptionReader } from "./useLongOptionReader";

export const useLongOptionModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();
  const { inputValue } = useBasicModalState();

  const longOptionReaderQuery = useLongOptionReader(vaultId, inputValue);

  return {
    longOptionReaderQuery,
  };
};
