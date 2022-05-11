import type { DemoIndexVaultConfig } from "../types";

export const demoIndexVaults: DemoIndexVaultConfig[] = [
  {
    id: "FRAX-DEMO",
    isDemo: true,
    isFeatured: true,
    assetSymbol: "FRAX",

    totalValueLocked: 0,

    supportedChainIds: [],

    totalPercentageYields: {
      annualPercentageYield: 139.25,
      monthlyPercentageYield: 9.02,
      weeklyPercentageYield: 2.08,
      annualPercentageRate: 107.72,
    },
  },
  {
    id: "BTC-DEMO",
    isDemo: true,
    isFeatured: true,
    assetSymbol: "BTC",

    totalValueLocked: 0,

    supportedChainIds: [],

    totalPercentageYields: {
      annualPercentageYield: 23.16,
      monthlyPercentageYield: 1.51,
      weeklyPercentageYield: 0.34,
      annualPercentageRate: 17.91,
    },
  },
  {
    id: "ETH-DEMO",
    isDemo: true,
    isFeatured: true,
    assetSymbol: "ETH",

    totalValueLocked: 0,

    supportedChainIds: [],

    totalPercentageYields: {
      annualPercentageYield: 19.21,
      monthlyPercentageYield: 1.24,
      weeklyPercentageYield: 0.28,
      annualPercentageRate: 14.86,
    },
  },
];
