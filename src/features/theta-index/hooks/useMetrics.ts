import { useQuery } from "react-query";

import { QueryType } from "../../shared/types";
import { metricsFetcher } from "../helpers";

export const useMetrics = () =>
  useQuery({
    queryKey: [QueryType.metrics],
    queryFn: metricsFetcher,
    staleTime: Number.POSITIVE_INFINITY,
  });
