import type { Big } from "big.js";

import type { CollateralAsset } from "../../lending-market/types/collateralAsset";
import type { Token } from "../../index-vault-modal/types";

export interface LendingMarketVaultReader {
  collateralAsset: CollateralAsset;
  debtToken: Token;
  debtTokenPrice: number;
  totalPosition: Big | null;
  currentPosition: Big | null;
  pendingBorrow: Big | null;
}
