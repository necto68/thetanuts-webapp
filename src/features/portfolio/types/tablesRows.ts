import type Big from "big.js";

import type { IndexVault, PercentageYields } from "../../index-vault/types";
import type { Token } from "../../index-vault-modal/types";

import type { Transaction } from "./transaction";

// TODO: add more different vault types (in productType)

export interface IndexTokenRow
  extends Pick<
      IndexVault,
      "assetSymbol" | "chainId" | "id" | "middleIndexPrice"
    >,
    Pick<Token, "balance" | "symbol" | "tokenAddress">,
    Pick<PercentageYields, "annualPercentageYield"> {
  productType: string;
  unclaimed: boolean;
}

export interface HistoryTransactionRow
  extends Pick<IndexVault, "assetSymbol">,
    Pick<Token, "symbol">,
    Pick<Transaction, "chainId" | "id" | "timestamp" | "type"> {
  balance: Big;
  claimed?: Big;
  productType: string;
  action: string;
  indexVaultId?: string;
}
