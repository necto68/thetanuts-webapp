import type { DemoIndexVaultConfig } from "../types";
import { ChainId } from "../../wallet/constants";

export const demoIndexVaults: DemoIndexVaultConfig[] = [
  {
    id: "USDC-DEMO",
    isDemo: true,
    isFeatured: true,
    assetSymbol: "USDC",

    totalValueLocked: 0,

    supportedChainIds: [
      ChainId.ETHEREUM,
      ChainId.BSC,
      ChainId.POLYGON,
      ChainId.AVALANCHE,
      ChainId.FANTOM,
    ],

    totalPercentageYields: {
      annualPercentageYield: 43.15,
      monthlyPercentageYield: 43.15,
      weeklyPercentageYield: 43.15,
      annualPercentageRate: 43.15,
    },
  },
  {
    id: "UST-DEMO",
    isDemo: true,
    isFeatured: true,
    assetSymbol: "UST",

    totalValueLocked: 0,

    supportedChainIds: [
      ChainId.ETHEREUM,
      ChainId.BSC,
      ChainId.POLYGON,
      ChainId.AVALANCHE,
    ],

    totalPercentageYields: {
      annualPercentageYield: 115.5,
      monthlyPercentageYield: 115.5,
      weeklyPercentageYield: 115.5,
      annualPercentageRate: 115.5,
    },
  },
  {
    id: "FRAX-DEMO",
    isDemo: true,
    isFeatured: false,
    assetSymbol: "FRAX",

    totalValueLocked: 0,

    supportedChainIds: [ChainId.ETHEREUM, ChainId.AVALANCHE],

    totalPercentageYields: {
      annualPercentageYield: 43.15,
      monthlyPercentageYield: 43.15,
      weeklyPercentageYield: 43.15,
      annualPercentageRate: 43.15,
    },
  },
  {
    id: "BTC-DEMO",
    isDemo: true,
    isFeatured: false,
    assetSymbol: "BTC",

    totalValueLocked: 0,

    supportedChainIds: [
      ChainId.ETHEREUM,
      ChainId.BSC,
      ChainId.POLYGON,
      ChainId.AVALANCHE,
    ],

    totalPercentageYields: {
      annualPercentageYield: 43.15,
      monthlyPercentageYield: 43.15,
      weeklyPercentageYield: 43.15,
      annualPercentageRate: 43.15,
    },
  },
  {
    id: "ETH-DEMO",
    isDemo: true,
    isFeatured: false,
    assetSymbol: "ETH",

    totalValueLocked: 0,

    supportedChainIds: [ChainId.ETHEREUM, ChainId.AVALANCHE],

    totalPercentageYields: {
      annualPercentageYield: 43.15,
      monthlyPercentageYield: 43.15,
      weeklyPercentageYield: 43.15,
      annualPercentageRate: 43.15,
    },
  },
];
