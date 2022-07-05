import type Big from "big.js";

import type { IndexVault, PercentageYields } from "../../index-vault/types";
import type { Token } from "../../index-vault-modal/types";
import type { ChainId } from "../../wallet/constants";

import type { Transaction } from "./transaction";

// TODO: add more different vault types (in productType)

export interface IndexTokenRow
  extends Pick<IndexVault, "assetSymbol" | "chainId" | "id">,
    Pick<Token, "balance" | "symbol" | "tokenAddress">,
    Pick<PercentageYields, "annualPercentageYield"> {
  productType: string;
  middleIndexPrice: Exclude<
    IndexVault["middleIndexPriceByChainId"][ChainId],
    undefined
  >;
  unclaimed: boolean;
  withdrawId?: number;
}

export interface HistoryTransactionRow
  extends Pick<IndexVault, "assetSymbol">,
    Pick<Token, "symbol">,
    Pick<Transaction, "chainId" | "id" | "timestamp" | "type"> {
  balance: Big;
  productType: string;
  action: string;
  claimed?: Big;
  indexVaultId?: string;
}
