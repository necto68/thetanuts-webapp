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
      indexVaultAddress: "0x8E62e5451a7AFeD3e4703c5462797A227D9a091B",
    },

    replications: [
      {
        chainId: ChainId.BSC,
        assetTokenAddress: "0x47225f6BD4a99E4099162b8674F21bB1100AA33c",
        indexTokenAddress: "0xB404B6Bc6537d66FFadE642B0158D423E2A6De22",
      },
    ],
  },
];
