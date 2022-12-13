import { useVaultModalState } from "../../modal/hooks";
import { useCollateralAsset } from "../../long/hooks";
import { useLongVaultReader } from "../../long-vault/hooks";
import { collateralAssets } from "../../long/constants";

export const useLongModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();

  const longVaultReaderQuery = useLongVaultReader(vaultId);

  const { data } = longVaultReaderQuery;
  const { collateralAsset } = data ?? {};

  const { id: collateralAssetId = collateralAssets[0].id } =
    collateralAsset ?? {};

  const collateralAssetQuery = useCollateralAsset(collateralAssetId);

  return {
    longVaultReaderQuery,
    collateralAssetQuery,
  };
};
