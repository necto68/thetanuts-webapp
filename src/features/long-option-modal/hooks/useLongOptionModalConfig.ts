import { useVaultModalState } from "../../modal/hooks";
import { useBasicModalState } from "../../basic-vault-modal/hooks";
import { longVaultsMap } from "../../basic/constants";

import { useLongOptionReader } from "./useLongOptionReader";
import { useLongOptionClosePositionReader } from "./useLongOptionClosePositionReader";
import { useAssetPrices } from "./useAssetPrices";

export const useLongOptionModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();
  const { inputValue } = useBasicModalState();

  const { chartSymbol = "" } = longVaultsMap[vaultId] ?? {};

  const longOptionReaderQuery = useLongOptionReader(vaultId, inputValue);
  const longOptionClosePositionReaderQuery = useLongOptionClosePositionReader(
    vaultId,
    inputValue
  );
  const assetPricesQuery = useAssetPrices(chartSymbol);

  return {
    longOptionReaderQuery,
    longOptionClosePositionReaderQuery,
    assetPricesQuery,
  };
};
