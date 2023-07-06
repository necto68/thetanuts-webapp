import { useQueries } from "react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { unclaimedBalanceFetcher } from "../helpers/unclaimedBalanceFetcher";
import type { ChainId } from "../../wallet/constants";
import { chainProvidersMap } from "../../wallet/constants";
import { QueryType } from "../../shared/types";

export const useUnclaimedBalanceQueries = (chainIds: ChainId[]) => {
  const { walletAddress } = useWallet();

  return useQueries(
    chainIds.map((chainId: ChainId) => {
      const provider = chainProvidersMap[chainId];

      return {
        queryKey: [QueryType.unclaimedBalance, chainId],

        queryFn: async () =>
          await unclaimedBalanceFetcher(chainId, walletAddress, provider),
      };
    })
  );
};
