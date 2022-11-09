import type { Big } from "big.js";

import type { CollateralAsset } from "../../long/types";
import type { Token } from "../../index-vault-modal/types";

export interface LongVaultReader {
  collateralAsset: CollateralAsset;
  debtToken: Token;
  debtTokenPrice: number;
  borrowAllowance: Big | null;
  totalPosition: Big | null;
  currentPosition: Big | null;
  borrowPending: Big | null;
  balance: Big;
  supplyCap: Big;
  supplyRemainder: number;
  borrowRemainder: number;
}
