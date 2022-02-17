import { ChainId } from "../../wallet/constants";

interface IndexVault {
  symbol: string;
  isFeatured?: boolean;
  source: {
    chainId: ChainId;
    indexVaultAddress: string;
  };
  replications: {
    chainId: ChainId;
    assetTokenAddress: string;
    indexTokenAddress: string;
  }[];
}

export const indexVaults: IndexVault[] = [
  {
    symbol: "TN-MVV1-ETH-CALL",
    isFeatured: true,

    source: {
      chainId: ChainId.MATIC,

      // 0x8E62e5451a7AFeD3e4703c5462797A227D9a091B
      // indexVaultAddress: "0x2c174BC9D00C7E9ed85fa3c507ad54B1456190cA",
      indexVaultAddress: "0x8E62e5451a7AFeD3e4703c5462797A227D9a091B",
    },

    replications: [
      {
        chainId: ChainId.ETHEREUM,
        assetTokenAddress: "testAddress",
        indexTokenAddress: "testAddress",
      },
    ],
  },
];
