import type Big from "big.js";
import type { ContractTransaction } from "ethers";

import type { ChainId } from "../../wallet/constants";
import type { VaultType, ILVaultMode, VaultRiskLevel } from "../constants";

export interface LocalVault {
  address: string;
  type: VaultType;
  title: string;
  description: string;
  color: string;
  riskLevel: VaultRiskLevel;
}

export interface Vault extends LocalVault {
  ILMode?: ILVaultMode;
  annualPercentageYield?: number;
  assetSymbol?: string;
  depositSymbol?: string;
  expiry?: number;
  isEpochSettled?: boolean;
  isEpochExpired?: boolean;
  isReadyForWithdraw?: boolean;
  currentDeposit?: Big;
  maxDeposit?: Big;
  userPosition?: Big;
  userPendingWithdrawal?: Big;
  userWalletBalance?: Big;
  userWalletAllowance?: Big;
  assetPrice?: number;
  strikePrice?: number | null;
  approve?: (amount: string) => Promise<ContractTransaction>;
  approvePermanent?: () => Promise<ContractTransaction>;
  deposit?: (amount: string) => Promise<ContractTransaction>;
  initWithdraw?: (amount: string) => Promise<ContractTransaction>;
  cancelWithdraw?: () => Promise<ContractTransaction>;
  withdraw?: () => Promise<ContractTransaction>;
}

export interface LocalVaultsWithChainId {
  chainId: ChainId;
  vaults: LocalVault[];
}
