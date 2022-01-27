import Big from 'big.js';
import { ContractTransaction } from 'ethers';
import { ChainIds } from '../../wallet/constants';
import { VaultTypes, ILVaultModes, VaultRiskLevels } from '../constants';

export interface LocalVault {
  address: string;
  type: VaultTypes;
  title: string;
  description: string;
  color: string;
  riskLevel: VaultRiskLevels;
}

export interface Vault extends LocalVault {
  ILMode?: ILVaultModes;
  apy?: number;
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
  chainId: ChainIds;
  vaults: LocalVault[];
}
