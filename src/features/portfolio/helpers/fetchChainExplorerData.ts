import type { EventFilter } from "@ethersproject/contracts";

import type { ChainId } from "../../wallet/constants";
import { chainsMap } from "../../wallet/constants";
import type { ChainExplorerResponse } from "../types";

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
    apiUrl.searchParams.set(`topic${index}`, topic.toString());
  });

  const response = await fetch(apiUrl.toString());
  const responseData =
    await (response.json() as Promise<ChainExplorerResponse>);

  if (responseData.status !== "1") {
    throw new Error(responseData.message);
  }

  return responseData;
};
