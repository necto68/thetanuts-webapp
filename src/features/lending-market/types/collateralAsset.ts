import type Big from "big.js";

import type { ChainId } from "../../wallet/constants/chains";
import type { Token } from "../../index-vault-modal/types";

export interface CollateralAsset {
  id: string;
  chainId: ChainId;
  collateralToken: Token;
  collateralTokenSymbol: string;
  collateralTokenBalance: Big | null;
  aTokenBalance: Big | null;
  loanToValue: number;
  collateralPrice: number;
  availableLeverage: number;
  lendingPoolAddress: string;
  priceOracleAddress: string;
}
