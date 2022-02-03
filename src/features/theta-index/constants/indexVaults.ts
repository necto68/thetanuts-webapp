import { ChainId } from "../../wallet/constants";

interface TokenAddressConfig {
  chainId: ChainId;
  tokenAddress: string;
}

interface IndexVault {
  symbol: string;
  isFeatured?: boolean;
  source: TokenAddressConfig;
  replications: TokenAddressConfig[];
}

export const indexVaults: IndexVault[] = [
  {
    symbol: "TN-MVV1-ETH-CALL",
    isFeatured: true,

    source: {
      chainId: ChainId.MATIC,
      tokenAddress: "0x2c174BC9D00C7E9ed85fa3c507ad54B1456190cA",
    },

    replications: [
      {
        chainId: ChainId.ETHEREUM,
        tokenAddress: "testAddress",
      },
    ],
  },
];
