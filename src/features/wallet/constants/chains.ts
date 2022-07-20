import { JsonRpcProvider } from "@ethersproject/providers";
import { providers as multiCallProviders } from "@0xsequence/multicall";

import type { ChainConfig } from "../types";

export enum ChainId {
  ETHEREUM = 1,
  BSC = 56,
  POLYGON = 137,
  AVALANCHE = 43_114,
  FANTOM = 250,
}

export const chains: ChainConfig[] = [
  {
    chainId: ChainId.ETHEREUM,
    title: "Ethereum",
    color: "#ffffff",
    symbol: "ETH",

    urls: {
      rpc: "https://rpc.ankr.com/eth",

      wsRpc:
        "wss://eth-mainnet.alchemyapi.io/v2/1eG2Zv-Q4-2GtMPfzp5MAg0gpaFJiAvl",

      explorer: "https://etherscan.io/",
      explorerApi: "https://api.etherscan.io/",
    },

    addresses: {
      routerAddress: "0x03fc1feddb196e69dd8a8753073e2527f85bbc6c",
      lendingPoolAddress: "0x2Ca7641B841a79Cc70220cE838d0b9f8197accDA",
      directDepositorAddress: "0xc4A024eAcB72F09900737E07605e253f73D408c7",
      directWithdrawalAddress: "0xd37264D3F67B063226D7B5aE4DE026A58b16E7Ff",
    },

    keys: {
      explorerApi: "H9YG861JU9VGXZXDBTR2C6CE23J8NSXSGC",
    },
  },
  {
    chainId: ChainId.BSC,
    title: "BSC",
    color: "#f0b90a",
    symbol: "BNB",

    urls: {
      rpc: "https://rpc.ankr.com/bsc",

      wsRpc:
        "wss://speedy-nodes-nyc.moralis.io/679f96c84d2846b6858638cd/bsc/mainnet",

      explorer: "https://bscscan.com/",
      explorerApi: "https://api.bscscan.com/",
    },

    keys: {
      explorerApi: "DY28MH5SJCHAJ16DAKHD8YJXM37WUTSJYP",
    },

    addresses: {
      routerAddress: "0xDFbf747D2E3278058d77b7De789f3c34e4F6f48c",
      lendingPoolAddress: "testAddress",
      directDepositorAddress: "testAddress",
      directWithdrawalAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.POLYGON,
    title: "Polygon",
    color: "#7b43d9",
    symbol: "MATIC",
    minGasPrice: 30_000_000_000,

    urls: {
      rpc: "https://rpc.ankr.com/polygon",

      wsRpc:
        "wss://polygon-mainnet.g.alchemy.com/v2/yXAUOrzEFQG2SQC7L7hI-u72mkoOPl53",

      explorer: "https://polygonscan.com/",
      explorerApi: "https://api.polygonscan.com/",
    },

    keys: {
      explorerApi: "PJMV9MU5ZK43D5JWZTJ28YJWJ51G76Q9U2",
    },

    addresses: {
      routerAddress: "0x79c089D49668077891460d7CDDadc11EB4Cb6A51",
      lendingPoolAddress: "0x69CB7e57FC301785aA0f933230DEE4C3E1f78e2b",
      directDepositorAddress: "0x21659962120ba152139FC157e52168CD1609C3E3",
      directWithdrawalAddress: "0x3140397763f0b1cb0ef3d070fbc388e6d2c2b6d2",
    },
  },
  {
    chainId: ChainId.AVALANCHE,
    title: "Avalanche",
    color: "#dc3e3f",
    symbol: "AVAX",

    urls: {
      rpc: "https://rpc.ankr.com/avalanche",

      wsRpc:
        "wss://speedy-nodes-nyc.moralis.io/55274cf945f839d43db1cb4f/avalanche/mainnet/ws",

      explorer: "https://snowtrace.io/",
      explorerApi: "https://api.snowtrace.io/",
    },

    keys: {
      explorerApi: "FWE95HNDKYITDAQCHIHMR3IIA4FFNN5WEH",
    },

    addresses: {
      routerAddress: "0x2Eb7C1cFdbf7d5c65A7BF7Bb50129Ee6e651CEb1",
      lendingPoolAddress: "testAddress",
      directDepositorAddress: "testAddress",
      directWithdrawalAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.FANTOM,
    title: "Fantom",
    color: "#3eb6e9",
    symbol: "FTM",

    urls: {
      rpc: "https://rpc.ankr.com/fantom",

      wsRpc:
        "wss://speedy-nodes-nyc.moralis.io/55274cf945f839d43db1cb4f/fantom/mainnet/ws",

      explorer: "https://ftmscan.com/",
      explorerApi: "https://api.ftmscan.com/",
    },

    keys: {
      explorerApi: "YAVSTA9H2BUE21X9XGDTK6V4149YN58VM1",
    },

    addresses: {
      routerAddress: "0xb8cB9648F78433056e089B8609f16Cb0D43ceCE7",
      lendingPoolAddress: "testAddress",
      directDepositorAddress: "testAddress",
      directWithdrawalAddress: "testAddress",
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
