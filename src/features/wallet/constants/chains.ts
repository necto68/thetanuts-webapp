import { JsonRpcProvider } from "@ethersproject/providers";
import { providers as multiCallProviders } from "@0xsequence/multicall";

import type { ChainConfig } from "../types";

export enum ChainId {
  ETHEREUM = 1,
  BSC = 56,
  POLYGON = 137,
  AVALANCHE = 43_114,
  FANTOM = 250,
  BOBA = 288,
  CRONOS = 25,
}

export const chainIconSymbols: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: "ETH",
  [ChainId.BSC]: "BNB",
  [ChainId.POLYGON]: "MATIC",
  [ChainId.AVALANCHE]: "AVAX",
  [ChainId.FANTOM]: "FTM",
  [ChainId.BOBA]: "BOBA",
  [ChainId.CRONOS]: "CRO",
};

export const chains: ChainConfig[] = [
  {
    chainId: ChainId.ETHEREUM,
    title: "Ethereum",
    symbol: "ETH",

    urls: {
      rpc: "https://rpc.ankr.com/eth",
      explorer: "https://etherscan.io/",
      explorerApi: "https://api.etherscan.io/",
    },

    addresses: {
      routerAddress: "0x9C93b9042fa7fEb69e81483af11F51b1B3B6D3Ca",
      lendingPoolAddress: "0x2Ca7641B841a79Cc70220cE838d0b9f8197accDA",
      directDepositorAddress: "0xc4A024eAcB72F09900737E07605e253f73D408c7",
      directWithdrawalAddress: "0xECe2590c8a8298D30af64DFF24069A488C1D262c",
      basicVaultReaderAddress: "0xEcA593A42E9A0120B03E8784Ca61673e4a40Ba13",
    },

    deployerAddresses: {
      directWithdrawalDeployerAddress:
        "0x4A4c7C5549359b9fFf0137bb3EC4D48c4Aa79Cc7",
    },

    keys: {
      explorerApi: "H9YG861JU9VGXZXDBTR2C6CE23J8NSXSGC",
    },
  },
  {
    chainId: ChainId.BSC,
    title: "BSC",
    symbol: "BNB",

    urls: {
      rpc: "https://rpc.ankr.com/bsc",
      explorer: "https://bscscan.com/",
      explorerApi: "https://api.bscscan.com/",
    },

    keys: {
      explorerApi: "DY28MH5SJCHAJ16DAKHD8YJXM37WUTSJYP",
    },

    addresses: {
      routerAddress: "0xDFbf747D2E3278058d77b7De789f3c34e4F6f48c",
      lendingPoolAddress: "",
      directDepositorAddress: "",
      directWithdrawalAddress: "",
      basicVaultReaderAddress: "0xe016D63bd3ce7BbAF9Eb8aBf76dA7e3f6E4721a3",
    },
  },
  {
    chainId: ChainId.POLYGON,
    title: "Polygon",
    symbol: "MATIC",
    minGasPrice: 30_000_000_000,

    urls: {
      rpc: "https://rpc.ankr.com/polygon",
      explorer: "https://polygonscan.com/",
      explorerApi: "https://api.polygonscan.com/",
    },

    keys: {
      explorerApi: "PJMV9MU5ZK43D5JWZTJ28YJWJ51G76Q9U2",
    },

    addresses: {
      routerAddress: "0x0dCEC1Fc9921D16aa59e3C251bcc85b7b263ceBE",
      lendingPoolAddress: "0x69CB7e57FC301785aA0f933230DEE4C3E1f78e2b",
      directDepositorAddress: "0x21659962120ba152139FC157e52168CD1609C3E3",
      directWithdrawalAddress: "0xf35F0A93B1f3c0eE418AaA352553Bc7C1d3dBe4a",
      basicVaultReaderAddress: "0x03FC1fEdDb196e69Dd8a8753073E2527f85bbC6C",
    },

    deployerAddresses: {
      directWithdrawalDeployerAddress:
        "0x4A4c7C5549359b9fFf0137bb3EC4D48c4Aa79Cc7",
    },
  },
  {
    chainId: ChainId.AVALANCHE,
    title: "Avalanche",
    symbol: "AVAX",

    urls: {
      rpc: "https://rpc.ankr.com/avalanche",
      explorer: "https://snowtrace.io/",
      explorerApi: "https://api.snowtrace.io/",
    },

    keys: {
      explorerApi: "FWE95HNDKYITDAQCHIHMR3IIA4FFNN5WEH",
    },

    addresses: {
      routerAddress: "0x2Eb7C1cFdbf7d5c65A7BF7Bb50129Ee6e651CEb1",
      lendingPoolAddress: "",
      directDepositorAddress: "",
      directWithdrawalAddress: "",
      basicVaultReaderAddress: "0xA9c4b4f5Efcb3bC9a400D699943E0760065CA09A",
    },
  },
  {
    chainId: ChainId.FANTOM,
    title: "Fantom",
    symbol: "FTM",

    urls: {
      rpc: "https://rpc.ankr.com/fantom",
      explorer: "https://ftmscan.com/",
      explorerApi: "https://api.ftmscan.com/",
    },

    keys: {
      explorerApi: "YAVSTA9H2BUE21X9XGDTK6V4149YN58VM1",
    },

    addresses: {
      routerAddress: "0xb8cB9648F78433056e089B8609f16Cb0D43ceCE7",
      lendingPoolAddress: "",
      directDepositorAddress: "",
      directWithdrawalAddress: "",
      basicVaultReaderAddress: "0x10572d1A9d38178C3d95666803f0551B77301003",
    },
  },
  {
    chainId: ChainId.BOBA,
    title: "Boba",
    symbol: "ETH",

    urls: {
      rpc: "https://mainnet.boba.network",
      explorer: "https://bobascan.com/",
      explorerApi: "https://api.bobascan.com/",
    },

    keys: {
      explorerApi: "PW1MZGXPPJZY9N51ACRYPNCMQ8C5N5ANQE",
    },

    addresses: {
      routerAddress: "0x17C83E2B96ACfb5190d63F5E46d93c107eC0b514",
      lendingPoolAddress: "",
      directDepositorAddress: "",
      directWithdrawalAddress: "",
      basicVaultReaderAddress: "0xe50d41E66A70D087F5480Ef84ABcF2e312534b05",
    },
  },
  {
    chainId: ChainId.CRONOS,
    title: "Cronos",
    symbol: "CRO",

    urls: {
      rpc: "https://node.croswap.com/rpc",
      explorer: "https://cronoscan.com/",
      explorerApi: "https://api.cronoscan.com/",
    },

    keys: {
      explorerApi: "JWFE21YZQDXQQVE1YV8CTE7C69CW1FMQHI",
    },

    addresses: {
      routerAddress: "0xcd7d16fB918511BF7269eC4f48d61D79Fb26f918",
      lendingPoolAddress: "",
      directDepositorAddress: "",
      directWithdrawalAddress: "",
      basicVaultReaderAddress: "0xaF724813e860B462a3387Fb97CC2600179CAF9e1",
    },
  },
];

export const chainsWithMulticall = [ChainId.ETHEREUM, ChainId.POLYGON];

export const chainsMap: Record<ChainId, ChainConfig> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, chain])
) as unknown as Record<ChainId, ChainConfig>;

export const chainProvidersMap: Record<ChainId, JsonRpcProvider> =
  Object.fromEntries(
    chains.map(({ chainId, urls }) => {
      const jsonRpcProvider = new JsonRpcProvider(urls.rpc);

      if (chainsWithMulticall.includes(chainId)) {
        return [
          chainId,
          new multiCallProviders.MulticallProvider(jsonRpcProvider),
        ];
      }

      return [chainId, jsonRpcProvider];
    })
  ) as unknown as Record<ChainId, JsonRpcProvider>;
