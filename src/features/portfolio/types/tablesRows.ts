import type Big from "big.js";

import type { IndexVault } from "../../index-vault/types";
import type { Token } from "../../index-vault-modal/types";
import type {
  BasicVault,
  PercentageYields,
  BasicVaultReader,
} from "../../basic-vault/types";
import type { VaultModalType } from "../../root/types/VaultModalType";

import type { Transaction } from "./transaction";

export interface BaseRow
  extends Pick<
      BasicVault,
      | "assetPrice"
      | "assetSymbol"
      | "chainId"
      | "collateralSymbol"
      | "id"
      | "type"
    >,
    Pick<BasicVaultReader, "currentPosition">,
    Pick<Token, "symbol">,
    Pick<PercentageYields, "annualPercentageYield"> {
  vaultType: VaultModalType;
}

export interface IndexVaultRow extends BaseRow {
  unclaimed?: boolean;
  withdrawId?: number;
}

export interface BasicVaultRow
  extends BaseRow,
    Pick<BasicVaultReader, "depositPending" | "withdrawalPending"> {}

export interface HistoryTransactionRow
  extends Pick<IndexVault, "assetSymbol" | "collateralSymbol">,
    Pick<Token, "symbol">,
    Pick<Transaction, "chainId" | "id" | "timestamp" | "type"> {
  balance: Big;
  strategyType: IndexVault["type"];
  vaultType: VaultModalType;
}
