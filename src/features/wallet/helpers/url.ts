import type { ChainId } from "../constants";
import { chainsMap } from "../constants";
import { PathType } from "../types";

export const getExplorerUrl = (
  pathType: PathType,
  chainId: ChainId,
  address: string
) => {
  const {
    urls: { explorer },
  } = chainsMap[chainId];

  return new URL(`/${PathType[pathType]}/${address}`, explorer).toString();
};
