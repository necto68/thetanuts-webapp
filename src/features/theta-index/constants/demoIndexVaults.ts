import type { DemoIndexVaultConfig } from "../types";
import { VaultType } from "../../basic-vault/types";

export const demoIndexVaults: DemoIndexVaultConfig[] = [
  {
    id: "FRAX-DEMO",
    type: VaultType.PUT,
    isDemo: true,
    isFeatured: true,
    assetSymbol: "FRAX",
    collateralSymbol: "FRAX",

    totalValueLocked: 0,

    supportedChainIds: [],

    totalPercentageYields: {
      annualPercentageYield: 139.25,
      monthlyPercentageYield: 9.02,
      periodPercentageYield: 2.08,
      weeklyPercentageYield: 2.08,
      annualPercentageRate: 107.72,
    },

    totalRiskLevel: null,
  },
];
