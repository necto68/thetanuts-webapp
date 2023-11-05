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
  AURORA = 1_313_161_554,
  ARBITRUM = 42_161,
  FILECOIN = 314,
  ZK_EVM = 1101,
}

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";

export const chainIconSymbols: Record<ChainId, string> = {
  [ChainId.ETHEREUM]: "ETH",
  [ChainId.BSC]: "BNB",
  [ChainId.POLYGON]: "MATIC",
  [ChainId.AVALANCHE]: "AVAX",
  [ChainId.FANTOM]: "FTM",
  [ChainId.BOBA]: "BOBA",
  [ChainId.CRONOS]: "CRO",
  [ChainId.AURORA]: "AURORA",
  [ChainId.ARBITRUM]: "ARB",
  [ChainId.FILECOIN]: "FIL",
  [ChainId.ZK_EVM]: "MATIC",
};

export const chains: ChainConfig[] = [
  {
    chainId: ChainId.ETHEREUM,
    title: "Ethereum",
    symbol: "ETH",

    urls: {
      rpc: "https://ethereum.publicnode.com",
      explorer: "https://etherscan.io/",
      explorerApi: "https://api.etherscan.io/",
    },

    addresses: {
      routerAddress: "0xBF17B562e05Ff739E5E8279413BE424c0F08feb1",
      lendingPoolAddress: "0x2Ca7641B841a79Cc70220cE838d0b9f8197accDA",
      directDepositorAddress: "0xCEc4707748D9118FB65E321a7A83AC206868d8cd",
      directWithdrawalAddress: "0xECe2590c8a8298D30af64DFF24069A488C1D262c",
      basicVaultReaderAddress: "0xEcA593A42E9A0120B03E8784Ca61673e4a40Ba13",
      basicVaultDepositorAddress: "0xaA7e4C5F93Aa986d627113496570A732386F570d",

      longVaultPositionManagerAddress:
        "0xd588A0297e8C1Eb4670b1bB55f38F4Ca77d053E8",

      quoterAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
    },

    deployerAddresses: {
      directWithdrawalDeployerAddress:
        "0x4A4c7C5549359b9fFf0137bb3EC4D48c4Aa79Cc7",
    },

    keys: {
      explorerApi: [
        "H9YG861JU9VGXZXDBTR2C6CE23J8NSXSGC",
        "YCNY4PDQYYH2JE3GEDK7ZWARNDEVB2WYWH",
        "UGQ2VSHXWZSHH5ERC3JT233XBQ9HEV3I63",
      ],
    },
  },
  {
    chainId: ChainId.BSC,
    title: "BSC",
    symbol: "BNB",

    urls: {
      rpc: "https://bsc-dataseed4.binance.org/",
      explorer: "https://bscscan.com/",
      explorerApi: "https://api.bscscan.com/",
    },

    keys: {
      explorerApi: [
        "DY28MH5SJCHAJ16DAKHD8YJXM37WUTSJYP",
        "5QM8CVF4USTJ9PPPKFF6F24MTFSJ234P9N",
        "A6KD3Z4QVDA3W6E8EPYSV4MZEX5W2SP5AK",
      ],
    },

    addresses: {
      routerAddress: "0xDFbf747D2E3278058d77b7De789f3c34e4F6f48c",
      lendingPoolAddress: ZERO_ADDRESS,
      directDepositorAddress: ZERO_ADDRESS,
      directWithdrawalAddress: ZERO_ADDRESS,
      basicVaultReaderAddress: "0xe016D63bd3ce7BbAF9Eb8aBf76dA7e3f6E4721a3",
      basicVaultDepositorAddress: ZERO_ADDRESS,

      longVaultPositionManagerAddress:
        "0x03Cd40F93Ae3b80f996691238F742568c24C9C3D",

      quoterAddress: "0x78D78E420Da98ad378D7799bE8f4AF69033EB077",
    },
  },
  {
    chainId: ChainId.POLYGON,
    title: "Polygon",
    symbol: "MATIC",
    minGasPrice: 30_000_000_000,

    urls: {
      rpc: "https://polygon-bor.publicnode.com",
      explorer: "https://polygonscan.com/",
      explorerApi: "https://api.polygonscan.com/",
    },

    keys: {
      explorerApi: [
        "PJMV9MU5ZK43D5JWZTJ28YJWJ51G76Q9U2",
        "ECZM94TW6VXE9QQEET6XN54RX1JQUQHXGZ",
        "IBCDHD3UCSN94JXG4WST1A98P8I42FDZYA",
      ],
    },

    addresses: {
      routerAddress: "0x0dCEC1Fc9921D16aa59e3C251bcc85b7b263ceBE",
      lendingPoolAddress: "0x69CB7e57FC301785aA0f933230DEE4C3E1f78e2b",
      directDepositorAddress: "0x21659962120ba152139FC157e52168CD1609C3E3",
      directWithdrawalAddress: "0xf35F0A93B1f3c0eE418AaA352553Bc7C1d3dBe4a",
      basicVaultReaderAddress: "0x03FC1fEdDb196e69Dd8a8753073E2527f85bbC6C",
      basicVaultDepositorAddress: "0x74af0AcF759dcB803993F14b22C2e500063ba0Fe",

      longVaultPositionManagerAddress:
        "0xA3ea5326771a28F7dF4e2f7980dBB238a62f9e9C",

      quoterAddress: "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6",
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
      rpc: "https://api.avax.network/ext/bc/C/rpc",
      explorer: "https://snowtrace.io/",
      explorerApi: "https://api.snowtrace.io/",
    },

    keys: {
      explorerApi: [
        "FWE95HNDKYITDAQCHIHMR3IIA4FFNN5WEH",
        "KZ7FGQPH92P39ADB1I9EHWBENG7PT7WWQB",
        "W5CE6BPVDEDPSM6G3GJ1JRNST1I1P37UDY",
      ],
    },

    addresses: {
      routerAddress: "0x2Eb7C1cFdbf7d5c65A7BF7Bb50129Ee6e651CEb1",
      lendingPoolAddress: ZERO_ADDRESS,
      directDepositorAddress: ZERO_ADDRESS,
      directWithdrawalAddress: ZERO_ADDRESS,
      basicVaultReaderAddress: "0xA9c4b4f5Efcb3bC9a400D699943E0760065CA09A",
      basicVaultDepositorAddress: ZERO_ADDRESS,
      longVaultPositionManagerAddress: ZERO_ADDRESS,
      quoterAddress: ZERO_ADDRESS,
    },
  },
  {
    chainId: ChainId.FANTOM,
    title: "Fantom",
    symbol: "FTM",

    urls: {
      rpc: "https://fantom.publicnode.com",
      explorer: "https://ftmscan.com/",
      explorerApi: "https://api.ftmscan.com/",
    },

    keys: {
      explorerApi: [
        "YAVSTA9H2BUE21X9XGDTK6V4149YN58VM1",
        "AAYCUTGS5JY1BKCD3EKHE9FMKNYDAPTXG2",
        "I8VMNS8RQE7NEHISSN4ZH2WBR7W3GFS2IA",
      ],
    },

    addresses: {
      routerAddress: "0xb8cB9648F78433056e089B8609f16Cb0D43ceCE7",
      lendingPoolAddress: ZERO_ADDRESS,
      directDepositorAddress: ZERO_ADDRESS,
      directWithdrawalAddress: ZERO_ADDRESS,
      basicVaultReaderAddress: "0x10572d1A9d38178C3d95666803f0551B77301003",
      basicVaultDepositorAddress: ZERO_ADDRESS,
      longVaultPositionManagerAddress: ZERO_ADDRESS,
      quoterAddress: ZERO_ADDRESS,
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
      explorerApi: [
        "PW1MZGXPPJZY9N51ACRYPNCMQ8C5N5ANQE",
        "HZC3SPJF788SCZXRJ7I2TJ57VSD7CEFF1Q",
        "W3AJ3R2HDV8S1VHI74NTYYU661BD3TTTSM",
      ],
    },

    addresses: {
      routerAddress: "0x17C83E2B96ACfb5190d63F5E46d93c107eC0b514",
      lendingPoolAddress: ZERO_ADDRESS,
      directDepositorAddress: ZERO_ADDRESS,
      directWithdrawalAddress: ZERO_ADDRESS,
      basicVaultReaderAddress: "0xe50d41E66A70D087F5480Ef84ABcF2e312534b05",
      basicVaultDepositorAddress: ZERO_ADDRESS,
      longVaultPositionManagerAddress: ZERO_ADDRESS,
      quoterAddress: ZERO_ADDRESS,
    },
  },
  {
    chainId: ChainId.CRONOS,
    title: "Cronos",
    symbol: "CRO",

    urls: {
      rpc: "https://cronos-evm.publicnode.com",
      explorer: "https://cronoscan.com/",
      explorerApi: "https://api.cronoscan.com/",
    },

    keys: {
      explorerApi: [
        "JWFE21YZQDXQQVE1YV8CTE7C69CW1FMQHI",
        "TXKIRG2UND6MHK5DXT87V869W58TWDVI39",
        "Q7WI97PEEW7U7TERGX7FTJSBPK98ZAGNJ9",
      ],
    },

    addresses: {
      routerAddress: "0xcd7d16fB918511BF7269eC4f48d61D79Fb26f918",
      lendingPoolAddress: ZERO_ADDRESS,
      directDepositorAddress: ZERO_ADDRESS,
      directWithdrawalAddress: ZERO_ADDRESS,
      basicVaultReaderAddress: "0xaF724813e860B462a3387Fb97CC2600179CAF9e1",
      basicVaultDepositorAddress: ZERO_ADDRESS,
      longVaultPositionManagerAddress: ZERO_ADDRESS,
      quoterAddress: ZERO_ADDRESS,
    },
  },
  {
    chainId: ChainId.AURORA,
    title: "Aurora",
    symbol: "ETH",

    urls: {
      rpc: "https://mainnet.aurora.dev",
      explorer: "https://aurorascan.dev/",
      explorerApi: "https://api.aurorascan.dev/",
    },

    keys: {
      explorerApi: [
        "2E61KG4DBVCCS9CPCDIRSUPEWFTV31HQFK",
        "VTZ8ZHWBCPUTPIBR5US5XRTKH5ATV3SFKG",
        "6K358Y8JJXHG3QUPN9JVT51DRW73EAVE87",
      ],
    },

    addresses: {
      routerAddress: "0x2CB45Edb4517d5947aFdE3BEAbF95A582506858B",
      lendingPoolAddress: ZERO_ADDRESS,
      directDepositorAddress: ZERO_ADDRESS,
      directWithdrawalAddress: ZERO_ADDRESS,
      basicVaultReaderAddress: "0xd07C970e8F8534Da02096862F23A9a91C6F716a3",
      basicVaultDepositorAddress: ZERO_ADDRESS,
      longVaultPositionManagerAddress: ZERO_ADDRESS,
      quoterAddress: ZERO_ADDRESS,
    },
  },
  {
    chainId: ChainId.ARBITRUM,
    title: "Arbitrum",
    symbol: "ETH",

    urls: {
      rpc: "https://arb1.arbitrum.io/rpc",
      explorer: "https://arbiscan.io/",
      explorerApi: "https://api.arbiscan.io/",
    },

    keys: {
      explorerApi: [
        "X2ETFTJS4ZZVPDNKF9EQ891ZHGVZHHTF9G",
        "6IM79QYRMFRNITXQBYTE7PWP6GX7DP3DA4",
        "2I5YPG6JH5UN48GKPYRVEHPY2TTRCYDDDE",
      ],
    },

    addresses: {
      routerAddress: "0x7bF3c7C23501EA3E09B237D6F8AdcB7Ea3CeF41C",
      lendingPoolAddress: ZERO_ADDRESS,
      directDepositorAddress: ZERO_ADDRESS,
      directWithdrawalAddress: ZERO_ADDRESS,
      basicVaultReaderAddress: "0xE061c3E9eec0AbD0a21AF480F48D4FeA538a6C66",
      basicVaultDepositorAddress: ZERO_ADDRESS,
      longVaultPositionManagerAddress: ZERO_ADDRESS,
      quoterAddress: ZERO_ADDRESS,
    },
  },
  {
    chainId: ChainId.FILECOIN,
    title: "Filecoin",
    symbol: "FIL",

    urls: {
      rpc: "https://filecoin.chainup.net/rpc/v1",
      explorer: "https://filfox.info/en",
    },

    keys: {},

    addresses: {
      routerAddress: ZERO_ADDRESS,
      lendingPoolAddress: ZERO_ADDRESS,
      directDepositorAddress: ZERO_ADDRESS,
      directWithdrawalAddress: ZERO_ADDRESS,
      basicVaultReaderAddress: "0xFf5fE7909Fc4d0D6643f1e8be8cba72610d0B485",
      basicVaultDepositorAddress: ZERO_ADDRESS,
      longVaultPositionManagerAddress: ZERO_ADDRESS,
      quoterAddress: ZERO_ADDRESS,
    },
  },
  {
    chainId: ChainId.ZK_EVM,
    title: "zkEVM",
    symbol: "ETH",

    urls: {
      rpc: "https://zkevm-rpc.com",
      explorer: "https://zkevm.polygonscan.com",
    },

    keys: {},

    addresses: {
      routerAddress: ZERO_ADDRESS,
      lendingPoolAddress: ZERO_ADDRESS,
      directDepositorAddress: ZERO_ADDRESS,
      directWithdrawalAddress: ZERO_ADDRESS,
      basicVaultReaderAddress: "0xDC7a1FfDAeB3D57273be1d4f7eE63727a04733f5",
      basicVaultDepositorAddress: "0x6D31e1126b4Abf8502fc80A1f61f1e930862B075",
      longVaultPositionManagerAddress: ZERO_ADDRESS,
      quoterAddress: ZERO_ADDRESS,
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
