import { ChainIds } from '../../wallet/constants';
import { LocalVault, LocalVaultsWithChainId } from '../types';

export enum VaultTypes {
  CALL = 'CALL',
  PUT = 'PUT',
  IL = 'IL',
}

export enum ILVaultModes {
  CALL = 0,
  PUT = 1,
}

export enum VaultRiskLevels {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

export const vaultTitles: Record<VaultTypes, string> = {
  [VaultTypes.CALL]: 'Covered Call',
  [VaultTypes.PUT]: 'Covered Put',
  [VaultTypes.IL]: 'IL Vault',
};

export const ILModeTitles: Record<ILVaultModes, string> = {
  [ILVaultModes.CALL]: 'Call-Selling',
  [ILVaultModes.PUT]: 'Put-Selling',
};

export const RiskLevelTitles: Record<VaultRiskLevels, string> = {
  [VaultRiskLevels.LOW]: 'Low',
  [VaultRiskLevels.MEDIUM]: 'Medium',
  [VaultRiskLevels.HIGH]: 'High',
};

const ethereumVaults: LocalVault[] = [
  {
    address: '0x4562a3Bf842e6441AD62501FdbF5Df13820770ff',
    type: VaultTypes.CALL,
    title: 'WETH-C',
    description: 'Generates yield by running an automated WETH-CALL',
    color: '#4C5BB2',
    riskLevel: VaultRiskLevels.LOW,
  },
  {
    address: '0xbab3834bF699e044860dDEC05a877dE306fEa0B0',
    type: VaultTypes.PUT,
    title: 'WETH-P',
    description: 'Generates yield by running an automated WETH-PUT',
    color: '#4C5BB2',
    riskLevel: VaultRiskLevels.LOW,
  },
  {
    address: '0xd29C0C7b99dFf0f4adAb58b29E5fa7d4dd53F159',
    type: VaultTypes.CALL,
    title: 'WBTC-C',
    description: 'Generates yield by running an automated WBTC-CALL',
    color: '#FF7900',
    riskLevel: VaultRiskLevels.LOW,
  },
  {
    address: '0xaCc3Ae01a38962351a25EA29B324FD2323DAa8C6',
    type: VaultTypes.PUT,
    title: 'WBTC-P',
    description: 'Generates yield by running an automated WBTC-PUT',
    color: '#FF7900',
    riskLevel: VaultRiskLevels.LOW,
  },
  {
    address: '0x83ec4cf88958922b9499f3510b1b33f17d42a972',
    type: VaultTypes.CALL,
    title: 'LUNA-C',
    description: 'Generates yield by running an automated LUNA-CALL',
    color: '#fbd83d',
    riskLevel: VaultRiskLevels.LOW,
  },
  {
    address: '0x3C7D509ed87e49DCFF83f123c6D94D4174C82bE7',
    type: VaultTypes.PUT,
    title: 'LUNA-P',
    description: 'Generates yield by running an automated LUNA-PUT',
    color: '#fbd83d',
    riskLevel: VaultRiskLevels.LOW,
  },
];

const rinkebyVaults: LocalVault[] = [
  {
    address: '0x9214AEB491Fb53115b4439d5cDcd2DB947E4e18c',
    type: VaultTypes.CALL,
    title: 'ETH-C',
    description: 'Generates yield by running an automated ETH-CALL',
    color: '#4C5BB2',
    riskLevel: VaultRiskLevels.LOW,
  },
];

const bscVaults: LocalVault[] = [
  {
    address: '0x9A17547a9499Dc7804626b937223Aa9f2E352d09',
    type: VaultTypes.IL,
    title: 'ADA-IL',
    description: 'Generates yield by running an automated ADA-IL ',
    color: '#3163c6',
    riskLevel: VaultRiskLevels.LOW,
  },
  {
    address: '0x8B87485705C6B6Dd509C29E7f52731d4c23E634d',
    type: VaultTypes.CALL,
    title: 'ADA-CALL',
    description: 'Generates yield by running an automated ADA-CALL',
    color: '#3163c6',
    riskLevel: VaultRiskLevels.LOW,
  },
  {
    address: '0x0ae51d6Cbe77b2ef050D8EDaf65734efBBDF8E13',
    type: VaultTypes.PUT,
    title: 'ADA-PUT',
    description: 'Generates yield by running an automated ADA-PUT',
    color: '#3163c6',
    riskLevel: VaultRiskLevels.LOW,
  },
];

export const vaults: LocalVaultsWithChainId[] = [
  {
    chainId: ChainIds.ETHEREUM,
    vaults: ethereumVaults,
  },
  {
    chainId: ChainIds.RINKEBY_TEST,
    vaults: rinkebyVaults,
  },
  {
    chainId: ChainIds.BSC,
    vaults: bscVaults,
  },
];

export const vaultsMap: Record<number, LocalVaultsWithChainId> =
  Object.fromEntries(
    vaults.map((vaultWithChainId) => [
      vaultWithChainId.chainId,
      vaultWithChainId,
    ]),
  );
