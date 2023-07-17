import type { Provider } from "@ethersproject/providers";
import { useQuery } from "react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { tokenFetcher } from "../helpers";
import { QueryType } from "../../shared/types";

export const useTokenQuery = (
  tokenAddress: string,
  spenderAddress: string,
  provider: Provider
) => {
  const { walletAddress } = useWallet();

  return useQuery({
    queryKey: [QueryType.token, tokenAddress, spenderAddress, walletAddress],

    queryFn: async () =>
      await tokenFetcher(tokenAddress, spenderAddress, provider, walletAddress),

    enabled: Boolean(tokenAddress),
  });
};
