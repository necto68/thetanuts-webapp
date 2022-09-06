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
      routerAddress: "0x9C93b9042fa7fEb69e81483af11F51b1B3B6D3Ca",
      lendingPoolAddress: "0x2Ca7641B841a79Cc70220cE838d0b9f8197accDA",
      directDepositorAddress: "0xc4A024eAcB72F09900737E07605e253f73D408c7",
      directWithdrawalAddress: "0xECe2590c8a8298D30af64DFF24069A488C1D262c",
      basicVaultReaderAddress: "0x2aA6860b1C50cD549bFF2a5b2F9B68a9cdc5a200",
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
      lendingPoolAddress: "",
      directDepositorAddress: "",
      directWithdrawalAddress: "",
      basicVaultReaderAddress: "",
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
      routerAddress: "0x0dCEC1Fc9921D16aa59e3C251bcc85b7b263ceBE",
      lendingPoolAddress: "0x69CB7e57FC301785aA0f933230DEE4C3E1f78e2b",
      directDepositorAddress: "0x21659962120ba152139FC157e52168CD1609C3E3",
      directWithdrawalAddress: "0xf35F0A93B1f3c0eE418AaA352553Bc7C1d3dBe4a",
      basicVaultReaderAddress: "0x6Cb010188D7007Dcd962C74901F82b83c4D3A721",
    },

    deployerAddresses: {
      directWithdrawalDeployerAddress:
        "0x4A4c7C5549359b9fFf0137bb3EC4D48c4Aa79Cc7",
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
      lendingPoolAddress: "",
      directDepositorAddress: "",
      directWithdrawalAddress: "",
      basicVaultReaderAddress: "",
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
      lendingPoolAddress: "",
      directDepositorAddress: "",
      directWithdrawalAddress: "",
      basicVaultReaderAddress: "",
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
