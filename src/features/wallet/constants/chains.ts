import type {
  ExternalProvider,
  JsonRpcProvider,
} from "@ethersproject/providers";
import { Web3Provider } from "@ethersproject/providers";
import Web3WsProvider from "web3-providers-ws";

import type { ChainConfig } from "../types";

import { wsProviderOptions } from "./providerOptions";

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
        "wss://speedy-nodes-nyc.moralis.io/fb7d03d686b1dfff5442704f/eth/mainnet/ws",

      explorer: "https://etherscan.io/",
      explorerApi: "https://api.etherscan.io/",
    },

    addresses: {
      routerAddress: "0xf38f7BC85B57F23EEA63AAa3e603a8f4fe9618Af",
      lendingPoolAddress: "testAddress",
      directDepositorAddress: "testAddress",
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
        "wss://speedy-nodes-nyc.moralis.io/fb7d03d686b1dfff5442704f/bsc/mainnet/ws",

      explorer: "https://bscscan.com/",
      explorerApi: "https://api.bscscan.com/",
    },

    keys: {
      explorerApi: "DY28MH5SJCHAJ16DAKHD8YJXM37WUTSJYP",
    },

    addresses: {
      routerAddress: "0x151D44E98F5Ab8AbF19b666800Cfdaa99869f663",
      lendingPoolAddress: "testAddress",
      directDepositorAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.POLYGON,
    title: "Polygon",
    color: "#7b43d9",
    symbol: "MATIC",

    urls: {
      rpc: "https://rpc.ankr.com/polygon",

      wsRpc:
        "wss://speedy-nodes-nyc.moralis.io/fb7d03d686b1dfff5442704f/polygon/mainnet/ws",

      explorer: "https://polygonscan.com/",
      explorerApi: "https://api.polygonscan.com/",
    },

    keys: {
      explorerApi: "PJMV9MU5ZK43D5JWZTJ28YJWJ51G76Q9U2",
    },

    addresses: {
      routerAddress: "0xcf532D8125a910d60D0B2EDbDA1740dECaf1369A",
      lendingPoolAddress: "0x69CB7e57FC301785aA0f933230DEE4C3E1f78e2b",
      directDepositorAddress: "0x21659962120ba152139FC157e52168CD1609C3E3",
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
        "wss://speedy-nodes-nyc.moralis.io/fb7d03d686b1dfff5442704f/avalanche/mainnet/ws",

      explorer: "https://snowtrace.io/",
      explorerApi: "https://api.snowtrace.io/",
    },

    keys: {
      explorerApi: "FWE95HNDKYITDAQCHIHMR3IIA4FFNN5WEH",
    },

    addresses: {
      routerAddress: "0x0f6f40fFD10e8fC76D16b378492d9a7e90BADdf0",
      lendingPoolAddress: "testAddress",
      directDepositorAddress: "testAddress",
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
        "wss://speedy-nodes-nyc.moralis.io/fb7d03d686b1dfff5442704f/fantom/mainnet/ws",

      explorer: "https://ftmscan.com/",
      explorerApi: "https://api.ftmscan.com/",
    },

    keys: {
      explorerApi: "YAVSTA9H2BUE21X9XGDTK6V4149YN58VM1",
    },

    addresses: {
      routerAddress: "0x9593D97Ce84b70121827F2cE269B2Ab06f634711",
      lendingPoolAddress: "testAddress",
      directDepositorAddress: "testAddress",
    },
  },
];

export const chainsMap: Record<ChainId, ChainConfig> = Object.fromEntries(
  chains.map((chain) => [chain.chainId, chain])
) as unknown as Record<ChainId, ChainConfig>;

export const chainProvidersMap: Record<ChainId, JsonRpcProvider> =
  Object.fromEntries(
    chains.map(({ chainId, urls }) => {
      // @ts-expect-error Web3WsProvider doesn't have correct types
      const wsProvider = new Web3WsProvider(
        urls.wsRpc,
        wsProviderOptions
      ) as ExternalProvider;

      return [chainId, new Web3Provider(wsProvider)];
    })
  ) as unknown as Record<ChainId, JsonRpcProvider>;
