import type { Big } from "big.js";

import type { CollateralAsset } from "../../lending-market/types";
import type { Token } from "../../index-vault-modal/types";

export interface LendingMarketVaultReader {
  collateralAsset: CollateralAsset;
  debtToken: Token;
  debtTokenPrice: number;
  borrowAllowance: Big | null;
  totalPosition: Big | null;
  currentPosition: Big | null;
  borrowPending: Big | null;
  maxBorrow: number;
  maxSupply: number;
}
