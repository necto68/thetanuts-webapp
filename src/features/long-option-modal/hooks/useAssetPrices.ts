import { useQuery } from "react-query";

import { QueryType } from "../../shared/types";
import { assetPricesFetcher } from "../helpers/assetPricesFetcher";

export const useAssetPrices = (chartSymbol: string) =>
  useQuery({
    queryKey: [QueryType.assetPrices, chartSymbol],
    queryFn: async () => await assetPricesFetcher(chartSymbol),
    enabled: Boolean(chartSymbol),
  });
