import type { BasicVaultConfig, LongVaultConfig } from "../types";
import { BasicVaultType } from "../types";
import { ChainId } from "../../wallet/constants";

export const productionBasicVaults: BasicVaultConfig[] = [
  // mainnet - eth call a/b/c
  {
    id: "TN-CSCCv1-ETHUSD-A",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x9014f8E90423766343Ed4fe41668563526dF6715",
    },
  },

  // {
  //   id: "TN-CSCCv1-ETHUSD-B",
  //   basicVaultType: BasicVaultType.BASIC,

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0xcb317b4b7CB45ef6D5Aa4e43171d16760dFE5eeA",
  //   },
  // },

  // {
  //   id: "TN-CSCCv1-ETHUSD-C",
  //   basicVaultType: BasicVaultType.BASIC,

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0x71F5d6fa67c2C9D2b76246569093390d02F80678",
  //   },
  // },

  // mainnet - btc call a/b/c
  {
    id: "TN-CSCCv1-BTCUSD-A",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x60a4422B6B52aEF50647c67F29D6a7e6DAc3CCBC",
    },
  },

  // {
  //   id: "TN-CSCCv1-BTCUSD-B",
  //   basicVaultType: BasicVaultType.BASIC,

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0xB2d3102944dEc6c4D7B0d87cA9De6eB13B70c11e",
  //   },
  // },

  // {
  //   id: "TN-CSCCv1-BTCUSD-C",
  //   basicVaultType: BasicVaultType.BASIC,

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0xB1105529305f166531b7d857B1d6f28000278aff",
  //   },
  // },

  // mainnet - eth put a/b
  {
    id: "TN-CSCPv1-ETHUSD-A",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x6d2Cdb589BE6037Df1AeA5dC433829aD5aF30013",
    },
  },

  // {
  //   id: "TN-CSCPv1-ETHUSD-B",
  //   basicVaultType: BasicVaultType.BASIC,

  //   source: {
  //     chainId: ChainId.ETHEREUM,
  //     basicVaultAddress: "0xE1c93dE547cc85CBD568295f6CC322B1dbBCf8Ae",
  //   },
  // },

  // mainnet - btc put
  {
    id: "TN-CSCPv1-BTCUSD-A",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x3BA337F3167eA35910E6979D5BC3b0AeE60E7d59",
    },
  },

  // mainnet - avax put
  {
    id: "TN-CSCPv1-AVAXUSD-A",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x248038fDb6F00f4B636812CA6A7F06b81a195AB8",
    },
  },

  // mainnet - sol put
  {
    id: "TN-CSCPv1-SOLUSD-A",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xb466a23c77df358B8B1e86514411c5Fe0D613896",
    },
  },

  // mainnet - matic put
  {
    id: "TN-CSCPv1-MATICUSD-A",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xAD57221ae9897DA08656aaaBd5B1D4673d4eDE71",
    },
  },

  // mainnet - bnb put
  {
    id: "TN-CSCPv1-BNBUSD-A",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xE5e8caA04C4b9E1C9bd944A2a78a48b05c3ef3AF",
    },
  },

  // bsc = bnb call
  {
    id: "TN-CSCCv1-BNBUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0x9EF72De1782431cf54518c42C06e26014E7201D1",
    },
  },

  // bsc = bnb call layer 3
  {
    id: "TN-CSCCv3-BNBUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0x9d574fba8C74BDFAC3010453d32B85831d65C88A",
    },
  },

  // bsc - ada call
  {
    id: "TN-CSCCv1-ADAUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0xF98297A842f52Cd1f6c6f5f003Cd701813b1C461",
    },
  },

  // bsc - bch call
  {
    id: "TN-CSCCv1-BCHUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0xc879ecC0d2cdA26072e9049178a99B26C51eDF8a",
    },
  },

  // bsc = bnb put
  {
    id: "TN-CSCPv1-BNBUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0xc75C3BE0Bc41857B9c1a675475F6E0a7c5Db63fC",
    },
  },

  // bsc - ada put
  {
    id: "TN-CSCPv1-ADAUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0x8BE731cB3b301b4a209C1A38ea14D6438e6913F6",
    },
  },

  // bsc - bch put
  {
    id: "TN-CSCPv1-BCHUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0xfe9B8054B947aCEeC01912Cf1811DB06fc804b69",
    },
  },

  // polygon - matic call
  {
    id: "TN-CSCCv1-MATICUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x9dA79023Af00d1f2054BB1eED0D49004fe41C5b5",
    },
  },

  // polygon - matic put
  {
    id: "TN-CSCPv1-MATICUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x1724B8679A9CaD6CABDef7DbEE1d5b03b44584B2",
    },
  },

  // avalanche - avax call
  {
    id: "TN-CSCCv1-AVAXUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.AVALANCHE,
      basicVaultAddress: "0xd06Bd68d58eD40CC2031238A3993b99172ea37cA",
    },
  },

  // avalanche - avax put
  {
    id: "TN-CSCPv1-AVAXUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.AVALANCHE,
      basicVaultAddress: "0xa84aA41B6287aFE467ccE688f3796A2205198F07",
    },
  },

  // fantom - ftm call
  {
    id: "TN-CSCCv1-FTMUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.FANTOM,
      basicVaultAddress: "0x302ABD505757FD355C8ef3cF8b4918D6404f4996",
    },
  },

  // fantom - ftm put
  // {
  //   id: "TN-CSCPv1-FTMUSD",
  //   basicVaultType: BasicVaultType.BASIC,

  //   source: {
  //     chainId: ChainId.FANTOM,
  //     basicVaultAddress: "0x7EDa4C29726355D0d8E85001B9152158b35Eae4f",
  //   },
  // },

  // boba - boba call
  {
    id: "TN-CSCCv1-BOBAUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.BOBA,
      basicVaultAddress: "0x5a9f1D95C59365613B4224e690Bb4971DD246142",
    },
  },

  // cro - cro call
  {
    id: "TN-CSCCv1-CROUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.CRONOS,
      basicVaultAddress: "0x99F05418967d3596CAfd260913b682Fd9b0CBB40",
    },
  },

  // aurora - near call
  {
    id: "TN-CSCCv1-NEARUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.AURORA,
      basicVaultAddress: "0xfc7F11Bb0d97d9db1f701eEA0fDE611536F1EB5F",
    },
  },

  // arbitrum - arb call
  {
    id: "TN-CSCCv1-ARBUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ARBITRUM,
      basicVaultAddress: "0x0833EC3262Dcc417D88f85Ed5E1EBAf768080f41",
    },
  },

  // filecoin - fil call
  {
    id: "TN-CSCCv1-FILUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.FILECOIN,
      basicVaultAddress: "0x03e35ed48101587F1A7B2C75f9A181D32BdF2D7D",
    },
  },

  // zkEVM - stMATIC call
  {
    id: "TN-CSCCv1-STMATICUSD",
    basicVaultType: BasicVaultType.BASIC,

    source: {
      chainId: ChainId.ZK_EVM,
      basicVaultAddress: "0x7bF3c7C23501EA3E09B237D6F8AdcB7Ea3CeF41C",
    },
  },
];

export const productionDegenVaults: BasicVaultConfig[] = [
  {
    id: "TN-CSCLPv1-ETHUSDC",
    basicVaultType: BasicVaultType.DEGEN,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x83e98cC31A3c0B0c7fD195bd8DA48f0Bf973c5Fd",
    },
  },
  {
    id: "TN-CSLCCv1-ETHUSDC",
    basicVaultType: BasicVaultType.DEGEN,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x1A16a54e071C872eDae94425CcAbd08Bc3079687",
    },
  },
  {
    id: "TN-CSCVv1-ETHUSDC",
    basicVaultType: BasicVaultType.DEGEN,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xF76ACf2b271d3077ad21EC0931cdA447bE9A8cC2",
    },
  },
];

export const productionWheelVaults: BasicVaultConfig[] = [
  {
    id: "TN-SMv1-ETHUSDC",
    basicVaultType: BasicVaultType.WHEEL,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x3567e2A6E161f3623307Aa4e59ceab6dEFf6291f",
    },
  },
];

export const productionLongVaults: LongVaultConfig[] = [
  // long trade vaults
  {
    id: "L-TN-CSCCv1-MATICUSD-A",
    basicVaultType: BasicVaultType.LONG,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x9dA79023Af00d1f2054BB1eED0D49004fe41C5b5",
    },

    chartSymbol: "MATICUSDT",
    protocolDataProviderAddress: "0x6F712293B16bAb8b9f66d1AF979925872A059AAE",
    isForLongTrade: true,
  },
  {
    id: "L-TN-CSCCv1-MATICUSD-B",
    basicVaultType: BasicVaultType.LONG,

    source: {
      chainId: ChainId.POLYGON,
      basicVaultAddress: "0x86acF4C7f74A82D28aBC370f333fBcbE34e50972",
    },

    chartSymbol: "MATICUSDT",
    protocolDataProviderAddress: "0x6F712293B16bAb8b9f66d1AF979925872A059AAE",
    isForLongTrade: true,
  },
  {
    id: "L-TN-CSCCv1-BNBUSD",
    basicVaultType: BasicVaultType.LONG,

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0x9EF72De1782431cf54518c42C06e26014E7201D1",
    },

    chartSymbol: "BNBUSDT",
    protocolDataProviderAddress: "0x2B2bAe3712484A4952cb9e6894f6D9dD2F257F0B",
    isForLongTrade: true,
  },
  {
    id: "L-TN-CSCPv1-BNBUSD-A",
    basicVaultType: BasicVaultType.LONG,

    source: {
      chainId: ChainId.BSC,
      basicVaultAddress: "0xc75C3BE0Bc41857B9c1a675475F6E0a7c5Db63fC",
    },

    chartSymbol: "BNBUSDT",
    protocolDataProviderAddress: "0x4Ca4A837EA940737eBB4e3edd79c12D1040075cA",
    isForLongTrade: true,
  },

  // long vaults
  {
    id: "L-TN-CSCPv1-BTCUSD",
    basicVaultType: BasicVaultType.LONG,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x3BA337F3167eA35910E6979D5BC3b0AeE60E7d59",
    },

    chartSymbol: "BTCUSDT",
    protocolDataProviderAddress: "0xD5B0856991E944714B8fA163E903AA4F15F58F2A",
  },
  {
    id: "L-TN-CSCPv1-ETHUSD",
    basicVaultType: BasicVaultType.LONG,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xE1c93dE547cc85CBD568295f6CC322B1dbBCf8Ae",
    },

    chartSymbol: "ETHUSDT",
    protocolDataProviderAddress: "0xD5B0856991E944714B8fA163E903AA4F15F58F2A",
  },
  {
    id: "L-TN-CSCPv1-AVAXUSD",
    basicVaultType: BasicVaultType.LONG,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0x248038fDb6F00f4B636812CA6A7F06b81a195AB8",
    },

    chartSymbol: "AVAXUSDT",
    protocolDataProviderAddress: "0xD5B0856991E944714B8fA163E903AA4F15F58F2A",
  },
  {
    id: "L-TN-CSCPv1-BNBUSD-B",
    basicVaultType: BasicVaultType.LONG,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xE5e8caA04C4b9E1C9bd944A2a78a48b05c3ef3AF",
    },

    chartSymbol: "BNBUSDT",
    protocolDataProviderAddress: "0xD5B0856991E944714B8fA163E903AA4F15F58F2A",
  },
  {
    id: "L-TN-CSCPv1-MATICUSD",
    basicVaultType: BasicVaultType.LONG,

    source: {
      chainId: ChainId.ETHEREUM,
      basicVaultAddress: "0xAD57221ae9897DA08656aaaBd5B1D4673d4eDE71",
    },

    chartSymbol: "MATICUSDT",
    protocolDataProviderAddress: "0xD5B0856991E944714B8fA163E903AA4F15F58F2A",
  },
];

export const productionLongTradeVaults = productionLongVaults.filter(
  ({ isForLongTrade }) => isForLongTrade
);

export const productionAllBasicVaults = productionBasicVaults.concat(
  productionDegenVaults,
  productionWheelVaults,
  productionLongVaults
);
