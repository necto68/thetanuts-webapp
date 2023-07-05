import { useQueries } from "react-query";
import { useConnectWallet } from "@web3-onboard/react";

import { unclaimedBalanceFetcher } from "../helpers/unclaimedBalanceFetcher";
import type { ChainId } from "../../wallet/constants";
import { chainProvidersMap } from "../../wallet/constants";
import { QueryType } from "../../shared/types";

export const useUnclaimedBalanceQueries = (chainIds: ChainId[]) => {
  const [{ wallet }] = useConnectWallet();
  const walletAddress = wallet?.accounts[0]?.address ?? "";

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
