import type { Metrics } from "../types";

export const metricsFetcher = async (): Promise<Metrics> => {
  const url = "https://thetanuts.finance/v1/info.json";

  const response = await fetch(url);

  return await (response.json() as Promise<Metrics>);
};
