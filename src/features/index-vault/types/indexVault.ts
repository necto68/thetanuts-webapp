import type Big from "big.js";

import type { VaultType } from "../../vault/constants";
import type { ChainId } from "../../wallet/constants";
import type { Token } from "../../index-vault-modal/types";

import type { Vault } from "./vault";

export interface VaultInfo {
  lpAmount: Big;
  weight: Big;
  allocation: number;
}

export interface IndexVault {
  id: string;
  type: VaultType;
  assetSymbol: string;
  assetTokenAddress: string;
  indexTokenAddress: string;
  vaults: Vault[];
  vaultsInfos: VaultInfo[];
  totalWeight: Big;
  totalValueLocked: number;
  totalAnnualPercentageYield: number;
  chainId: ChainId;
  supportedChainIds: ChainId[];
  indexTokens: Token[];
}
