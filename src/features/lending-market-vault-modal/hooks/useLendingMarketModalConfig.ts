import { useBasicVault } from "../../basic-vault/hooks";
import { useVaultModalState } from "../../modal/hooks";
import { collateralAssets } from "../../lending-market/constants";
import { useCollateralAsset } from "../../lending-market/hooks";

export const useLendingMarketModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();

  const basicVaultQuery = useBasicVault(vaultId);

  const { data } = basicVaultQuery;
  const { collateralTokenAddress = "" } = data ?? {};

  const collateralAsset = collateralAssets.find(
    (config) => config.source.collateralAssetAddress === collateralTokenAddress
  );
  const collateralAssetId = collateralAsset?.id ?? collateralAssets[0].id;

  const collateralAssetQuery = useCollateralAsset(collateralAssetId);

  const { data: collateralAssetData } = collateralAssetQuery;
  const { lendingPoolAddress = "" } = collateralAssetData ?? {};

  return {
    lendingPoolAddress,
    collateralAssetQuery,
  };
};
