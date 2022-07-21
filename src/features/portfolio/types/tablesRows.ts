import type Big from "big.js";

import type { IndexVault } from "../../index-vault/types";
import type { Token } from "../../index-vault-modal/types";
import type { BasicVault, PercentageYields } from "../../basic-vault/types";
import type { VaultModalType } from "../../root/types/VaultModalType";

import type { Transaction } from "./transaction";

export interface BaseRow
  extends Pick<BasicVault, "assetPrice" | "assetSymbol" | "chainId" | "id">,
    Pick<Token, "balance" | "symbol">,
    Pick<PercentageYields, "annualPercentageYield"> {
  vaultType: VaultModalType;
}

export interface IndexVaultRow extends BaseRow {
  unclaimed?: boolean;
  withdrawId?: number;
}

export interface BasicVaultRow extends BaseRow {
  collateralSymbol?: BasicVault["collateralSymbol"];
}

export interface HistoryTransactionRow
  extends Pick<IndexVault, "assetSymbol">,
    Pick<Token, "symbol">,
    Pick<Transaction, "chainId" | "id" | "timestamp" | "type"> {
  balance: Big;
  vaultType: VaultModalType;
}
