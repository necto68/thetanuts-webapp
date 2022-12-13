import { isTestEnvironment } from "../../shared/constants";
import type { CollateralAssetConfig } from "../types";

import { developCollateralAssets } from "./developCollateralAssets";
import { productionCollateralAssets } from "./productionCollateralAssets";

export const collateralAssets = isTestEnvironment
  ? developCollateralAssets.concat(productionCollateralAssets)
  : productionCollateralAssets;

export const collateralAssetsMap: Record<
  CollateralAssetConfig["id"],
  CollateralAssetConfig | undefined
> = Object.fromEntries(
  collateralAssets.map((collateralAsset) => [
    collateralAsset.id,
    collateralAsset,
  ])
);
