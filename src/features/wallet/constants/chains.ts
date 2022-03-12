import type {
  ExternalProvider,
  JsonRpcProvider,
} from "@ethersproject/providers";
import { Web3Provider } from "@ethersproject/providers";
import Web3WsProvider from "web3-providers-ws";

import { Eth, Bnb, Matic, Avax, Ftm } from "../../logo/components";
import type { ChainConfig } from "../types";

import { wsProviderOptions } from "./providerOptions";

export enum ChainId {
  ETHEREUM = 1,
  BSC = 56,
  MATIC = 137,
  AVALANCHE = 43_114,
  FANTOM = 250,
}

export const chains: ChainConfig[] = [
  {
    chainId: ChainId.ETHEREUM,
    title: "Ethereum",
    color: "#ffffff",
    logo: Eth,

    urls: {
      rpc: "wss://main-light.eth.linkpool.io/ws",
      explorer: "https://etherscan.io/",
      explorerApi: "https://api.etherscan.io/",
    },

    addresses: {
      routerAddress: "testAddress",
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
    logo: Bnb,

    urls: {
      rpc: "wss://speedy-nodes-nyc.moralis.io/fb7d03d686b1dfff5442704f/bsc/mainnet/ws",
      explorer: "https://bscscan.com/",
      explorerApi: "https://api.bscscan.com/",
    },

    keys: {
      explorerApi: "DY28MH5SJCHAJ16DAKHD8YJXM37WUTSJYP",
    },

    addresses: {
      routerAddress: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
      lendingPoolAddress: "testAddress",
      directDepositorAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.MATIC,
    title: "Matic",
    color: "#7b43d9",
    logo: Matic,

    urls: {
      rpc: "wss://speedy-nodes-nyc.moralis.io/fb7d03d686b1dfff5442704f/polygon/mainnet/ws",
      explorer: "https://polygonscan.com/",
      explorerApi: "https://api.polygonscan.com/",
    },

    keys: {
      explorerApi: "PJMV9MU5ZK43D5JWZTJ28YJWJ51G76Q9U2",
    },

    addresses: {
      routerAddress: "0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff",
      lendingPoolAddress: "0x69CB7e57FC301785aA0f933230DEE4C3E1f78e2b",
      directDepositorAddress: "0xb0bF492aa3A65b095F7243eDA87153fc604ea886",
    },
  },
  {
    chainId: ChainId.AVALANCHE,
    title: "Avalanche",
    color: "#dc3e3f",
    logo: Avax,

    urls: {
      rpc: "wss://api.avax.network/ext/bc/C/ws",
      explorer: "https://snowtrace.io/",
      explorerApi: "https://api.snowtrace.io/",
    },

    keys: {
      explorerApi: "FWE95HNDKYITDAQCHIHMR3IIA4FFNN5WEH",
    },

    addresses: {
      routerAddress: "testAddress",
      lendingPoolAddress: "testAddress",
      directDepositorAddress: "testAddress",
    },
  },
  {
    chainId: ChainId.FANTOM,
    title: "Fantom",
    color: "#3eb6e9",
    logo: Ftm,

    urls: {
      rpc: "wss://wsapi.fantom.network",
      explorer: "https://ftmscan.com/",
      explorerApi: "https://api.ftmscan.com/",
    },

    keys: {
      explorerApi: "YAVSTA9H2BUE21X9XGDTK6V4149YN58VM1",
    },

    addresses: {
      routerAddress: "testAddress",
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
        urls.rpc,
        wsProviderOptions
      ) as ExternalProvider;

      return [chainId, new Web3Provider(wsProvider)];
    })
  ) as unknown as Record<ChainId, JsonRpcProvider>;
