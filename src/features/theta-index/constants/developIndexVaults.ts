import { ChainId } from "../../wallet/constants";
import type { IndexVaultConfig } from "../types";

export const developIndexVaults: IndexVaultConfig[] = [
  {
    id: "TN-MVV1-ETH-CALL",
    isFeatured: true,

    source: {
      chainId: ChainId.POLYGON,
      indexVaultAddress: "0xbC9a5A041Ac1e2989d23250f293de087a7B363BD",
    },

    replications: [],

    priceFeeds: {
      assetPriceFeedAddress: "0xF9680D99D6C9589e2a93a78A04A279e509205945",
      indexPriceFeedAddress: "0x3040F2f056FcBF573550a6f303D2b0c6C6E8A715",
    },
  },
];
