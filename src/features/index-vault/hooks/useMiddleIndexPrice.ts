import { useQuery } from "react-query";
import type { Provider } from "@ethersproject/providers";

import { QueryType } from "../../shared/types";
import { middleIndexPriceFetcher } from "../helpers";

export const useMiddleIndexPrice = (
  assetPrice: number,
  assetTokenAddress: string,
  indexTokenAddress: string,
  routerAddress: string,
  provider: Provider
) =>
  useQuery({
    queryKey: [
      QueryType.middleIndexPrice,
      assetPrice,
      assetTokenAddress,
      indexTokenAddress,
      routerAddress,
    ],

    queryFn: async () =>
      await middleIndexPriceFetcher(
        assetPrice,
        assetTokenAddress,
        indexTokenAddress,
        routerAddress,
        provider
      ),
  });
