import { useVaultModalState } from "../../modal/hooks";
import { useCollateralAsset } from "../../lending-market/hooks";
import { useLendingMarketVaultReader } from "../../lending-market-vault/hooks";

export const useLendingMarketModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();

  const lendingMarketVaultReaderQuery = useLendingMarketVaultReader(vaultId);

  const { data } = lendingMarketVaultReaderQuery;
  const { collateralAsset } = data ?? {};
  const { id: collateralAssetId = "" } = collateralAsset ?? {};

  const collateralAssetQuery = useCollateralAsset(collateralAssetId);

  return {
    lendingMarketVaultReaderQuery,
    collateralAssetQuery,
  };
};
