import type { DemoIndexVaultConfig } from "../types";

export const demoIndexVaults: DemoIndexVaultConfig[] = [
  {
    id: "USDC-DEMO",
    isDemo: true,
    isFeatured: true,
    assetSymbol: "USDC",

    totalValueLocked: 0,

    supportedChainIds: [],

    totalPercentageYields: {
      annualPercentageYield: 50.63,
      monthlyPercentageYield: 3.28,
      weeklyPercentageYield: 0.75,
      annualPercentageRate: 39.16,
    },
  },
  {
    id: "UST-DEMO",
    isDemo: true,
    isFeatured: true,
    assetSymbol: "UST",

    totalValueLocked: 0,

    supportedChainIds: [],

    totalPercentageYields: {
      annualPercentageYield: 137.33,
      monthlyPercentageYield: 8.91,
      weeklyPercentageYield: 2.05,
      annualPercentageRate: 106.23,
    },
  },
  {
    id: "FRAX-DEMO",
    isDemo: true,
    isFeatured: false,
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
    isFeatured: false,
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
    isFeatured: false,
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
