import { ChainId } from "../../wallet/constants";
import type { LocalVault, LocalVaultsWithChainId } from "../types";

enum VaultType {
  CALL = "CALL",
  PUT = "PUT",
  IL = "IL",
}

enum ILVaultMode {
  CALL = 0,
  PUT = 1,
}

enum VaultRiskLevel {
  LOW = 0,
  MEDIUM = 1,
  HIGH = 2,
}

const vaultTitles: Record<VaultType, string> = {
  [VaultType.CALL]: "Covered Call",
  [VaultType.PUT]: "Covered Put",
  [VaultType.IL]: "IL Vault",
};

const ILModeTitles: Record<ILVaultMode, string> = {
  [ILVaultMode.CALL]: "Call-Selling",
  [ILVaultMode.PUT]: "Put-Selling",
};

const RiskLevelTitles: Record<VaultRiskLevel, string> = {
  [VaultRiskLevel.LOW]: "Low",
  [VaultRiskLevel.MEDIUM]: "Medium",
  [VaultRiskLevel.HIGH]: "High",
};

const ethereumVaults: LocalVault[] = [
  {
    address: "0x4562a3Bf842e6441AD62501FdbF5Df13820770ff",
    type: VaultType.CALL,
    title: "WETH-C",
    description: "Generates yield by running an automated WETH-CALL",
    color: "#4C5BB2",
    riskLevel: VaultRiskLevel.LOW,
  },
  {
    address: "0xbab3834bF699e044860dDEC05a877dE306fEa0B0",
    type: VaultType.PUT,
    title: "WETH-P",
    description: "Generates yield by running an automated WETH-PUT",
    color: "#4C5BB2",
    riskLevel: VaultRiskLevel.LOW,
  },
  {
    address: "0xd29C0C7b99dFf0f4adAb58b29E5fa7d4dd53F159",
    type: VaultType.CALL,
    title: "WBTC-C",
    description: "Generates yield by running an automated WBTC-CALL",
    color: "#FF7900",
    riskLevel: VaultRiskLevel.LOW,
  },
  {
    address: "0xaCc3Ae01a38962351a25EA29B324FD2323DAa8C6",
    type: VaultType.PUT,
    title: "WBTC-P",
    description: "Generates yield by running an automated WBTC-PUT",
    color: "#FF7900",
    riskLevel: VaultRiskLevel.LOW,
  },
  {
    address: "0x83ec4cf88958922b9499f3510b1b33f17d42a972",
    type: VaultType.CALL,
    title: "LUNA-C",
    description: "Generates yield by running an automated LUNA-CALL",
    color: "#fbd83d",
    riskLevel: VaultRiskLevel.LOW,
  },
  {
    address: "0x3C7D509ed87e49DCFF83f123c6D94D4174C82bE7",
    type: VaultType.PUT,
    title: "LUNA-P",
    description: "Generates yield by running an automated LUNA-PUT",
    color: "#fbd83d",
    riskLevel: VaultRiskLevel.LOW,
  },
];

const rinkebyVaults: LocalVault[] = [
  {
    address: "0x9214AEB491Fb53115b4439d5cDcd2DB947E4e18c",
    type: VaultType.CALL,
    title: "Eth-C",
    description: "Generates yield by running an automated Eth-CALL",
    color: "#4C5BB2",
    riskLevel: VaultRiskLevel.LOW,
  },
];

const bscVaults: LocalVault[] = [
  {
    address: "0x9A17547a9499Dc7804626b937223Aa9f2E352d09",
    type: VaultType.IL,
    title: "ADA-IL",
    description: "Generates yield by running an automated ADA-IL ",
    color: "#3163c6",
    riskLevel: VaultRiskLevel.LOW,
  },
  {
    address: "0x8B87485705C6B6Dd509C29E7f52731d4c23E634d",
    type: VaultType.CALL,
    title: "ADA-CALL",
    description: "Generates yield by running an automated ADA-CALL",
    color: "#3163c6",
    riskLevel: VaultRiskLevel.LOW,
  },
  {
    address: "0x0ae51d6Cbe77b2ef050D8EDaf65734efBBDF8E13",
    type: VaultType.PUT,
    title: "ADA-PUT",
    description: "Generates yield by running an automated ADA-PUT",
    color: "#3163c6",
    riskLevel: VaultRiskLevel.LOW,
  },
];

export const vaults: LocalVaultsWithChainId[] = [
  {
    chainId: ChainId.ETHEREUM,
    vaults: ethereumVaults,
  },
  {
    chainId: ChainId.RINKEBY,
    vaults: rinkebyVaults,
  },
  {
    chainId: ChainId.BSC,
    vaults: bscVaults,
  },
];

export const vaultsMap: Record<number, LocalVaultsWithChainId | undefined> =
  Object.fromEntries(
    vaults.map((vaultWithChainId) => [
      vaultWithChainId.chainId,
      vaultWithChainId,
    ])
  );

export {
  VaultType,
  ILVaultMode,
  VaultRiskLevel,
  vaultTitles,
  ILModeTitles,
  RiskLevelTitles,
};
