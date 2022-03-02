import type { IndexVault } from "../../index-vault/types";
import type { Token } from "../../index-vault-modal/types";

export interface IndexTokenRow
  extends Pick<
      IndexVault,
      "assetSymbol" | "chainId" | "id" | "totalAnnualPercentageYield" | "type"
    >,
    Pick<Token, "balance" | "symbol" | "tokenAddress"> {
  vaultType: string;
}

// TODO: add more different vault types ^
