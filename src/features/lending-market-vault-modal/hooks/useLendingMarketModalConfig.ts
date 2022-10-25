import { useVaultModalState } from "../../modal/hooks";
import { useCollateralAsset } from "../../lending-market/hooks";
import { useLendingMarketVaultReader } from "../../lending-market-vault/hooks";
import { collateralAssets } from "../../lending-market/constants";

export const useLendingMarketModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();

  const lendingMarketVaultReaderQuery = useLendingMarketVaultReader(vaultId);

  const { data } = lendingMarketVaultReaderQuery;
  const { collateralAsset } = data ?? {};

  const { id: collateralAssetId = collateralAssets[0].id } =
    collateralAsset ?? {};

  const collateralAssetQuery = useCollateralAsset(collateralAssetId);

  return {
    lendingMarketVaultReaderQuery,
    collateralAssetQuery,
  };
};
