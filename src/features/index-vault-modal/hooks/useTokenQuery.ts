import type { Provider } from "@ethersproject/providers";
import { useQuery } from "react-query";
import { useConnectWallet } from "@web3-onboard/react";

import { tokenFetcher } from "../helpers";
import { QueryType } from "../../shared/types";

export const useTokenQuery = (
  tokenAddress: string,
  spenderAddress: string,
  provider: Provider
) => {
  const [{ wallet }] = useConnectWallet();
  const walletAddress = wallet?.accounts[0]?.address ?? "";

  return useQuery({
    queryKey: [QueryType.token, tokenAddress, spenderAddress, walletAddress],

    queryFn: async () =>
      await tokenFetcher(tokenAddress, spenderAddress, provider, walletAddress),

    enabled: Boolean(tokenAddress),
  });
};
