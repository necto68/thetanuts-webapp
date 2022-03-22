import type Big from "big.js";

import type { IndexVault } from "../../index-vault/types";
import type { Token } from "../../index-vault-modal/types";
import type { PercentageYields } from "../../vault/types";

import type { Transaction } from "./transaction";

// TODO: add more different vault types (in vaultType)

export interface IndexTokenRow
  extends Pick<IndexVault, "assetSymbol" | "chainId" | "id" | "indexPrice">,
    Pick<Token, "balance" | "symbol" | "tokenAddress">,
    Pick<PercentageYields, "annualPercentageYield"> {
  vaultType: string;
}

export interface HistoryTransactionRow
  extends Pick<IndexVault, "assetSymbol">,
    Pick<Transaction, "chainId" | "id" | "timestamp" | "type"> {
  balance: Big;
  vaultType: string;
}
