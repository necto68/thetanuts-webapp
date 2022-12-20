import type { Big } from "big.js";

import type { CollateralAsset } from "../../long/types";
import type { Token } from "../../index-vault-modal/types";

export interface LongVaultReader {
  collateralAsset: CollateralAsset;
  debtToken: Token;
  debtTokenPrice: number;
  borrowAllowance: Big | null;
  totalContractsPosition: Big | null;
  currentContractsPosition: Big | null;
  borrowContractsPending: Big | null;
  balance: Big;
  supplyCap: Big;
  minSupplyValue: number;
  maxSupplyValue: number;
  borrowRemainder: number;
}
