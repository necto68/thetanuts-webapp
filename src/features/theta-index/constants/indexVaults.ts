import { ChainId } from "../../wallet/constants";

interface IndexVaultConfig {
  id: string;
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

export const indexVaults: IndexVaultConfig[] = [
  {
    id: "TN-MVV1-ETH-CALL",
    isFeatured: true,

    source: {
      chainId: ChainId.MATIC,
      indexVaultAddress: "0xa0759c71Bf30eA958D7C67D280314f0655aee5Bc",
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
