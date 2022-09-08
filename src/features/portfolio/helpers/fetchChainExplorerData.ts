import type { EventFilter } from "@ethersproject/contracts";
import throttledQueue from "throttled-queue";

import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";
import type { ChainExplorerResponse } from "../types";

// not more then 5 requests per 2010 ms
const throttle = throttledQueue(5, 2010);

export const fetchChainExplorerData = async (
  chainId: ChainId,
  filterAddress: EventFilter["address"] = "",
  filterTopics: EventFilter["topics"] = []
): Promise<ChainExplorerResponse> => {
  const { explorerApi: explorerApiUrl } = chainsMap[chainId].urls;
  const { explorerApi: explorerApiKey } = chainsMap[chainId].keys;

  if (!explorerApiUrl) {
    throw new Error("no explorerApiUrl");
  }

  const apiUrl = new URL("/api", explorerApiUrl);

  apiUrl.searchParams.set("module", "logs");
  apiUrl.searchParams.set("action", "getLogs");
  apiUrl.searchParams.set("fromBlock", "0");
  apiUrl.searchParams.set("toBlock", "latest");
  apiUrl.searchParams.set("address", filterAddress);

  if (explorerApiKey) {
    apiUrl.searchParams.set("apikey", explorerApiKey);
  }

  filterTopics.forEach((topic, index) => {
    if (topic) {
      apiUrl.searchParams.set(`topic${index}`, topic.toString());
    }
  });

  const response = await throttle(async () => await fetch(apiUrl.toString()));
  const responseData =
    await (response.json() as Promise<ChainExplorerResponse>);

  if (responseData.status !== "1") {
    throw new Error(responseData.message);
  }

  return responseData;
};
