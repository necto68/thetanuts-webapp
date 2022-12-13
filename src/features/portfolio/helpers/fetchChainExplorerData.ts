import type { EventFilter } from "@ethersproject/contracts";
import throttledQueue from "throttled-queue";

import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";
import type { ChainExplorerResponse } from "../types";

// not more then 7 requests per 1010 ms
const throttle = throttledQueue(8, 1010, true);
let requestsCounter = 0;

export const fetchChainExplorerData = async (
  chainId: ChainId,
  filterAddress: EventFilter["address"] = "",
  filterTopics: EventFilter["topics"] = []
): Promise<ChainExplorerResponse> => {
  const { explorerApi: explorerApiUrl } = chainsMap[chainId].urls;
  const { explorerApi: explorerApiKeys } = chainsMap[chainId].keys;

  const apiKeyIndex = explorerApiKeys
    ? requestsCounter % explorerApiKeys.length
    : 0;

  const explorerApiKey = explorerApiKeys ? explorerApiKeys[apiKeyIndex] : null;

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

  requestsCounter += 1;

  const response = await throttle(async () => await fetch(apiUrl.toString()));
  const responseData =
    await (response.json() as Promise<ChainExplorerResponse>);

  if (responseData.status !== "1") {
    throw new Error(responseData.message);
  }

  return responseData;
};
