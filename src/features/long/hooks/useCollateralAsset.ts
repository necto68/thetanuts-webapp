import { useCollateralAssets } from "./useCollateralAssets";

export const useCollateralAsset = (collateralAssetId: string) => {
  const collateralAssets = useCollateralAssets([collateralAssetId]);

  return collateralAssets[0];
};
