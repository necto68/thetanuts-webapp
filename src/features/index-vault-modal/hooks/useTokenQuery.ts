import type { Provider } from "@ethersproject/providers";
import { useQuery } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { tokenFetcher } from "../helpers";

export const useTokenQuery = (
  tokenAddress: string,
  routerAddress: string,
  provider: Provider
) => {
  const { account = "" } = useWallet();

  return useQuery({
    queryKey: [tokenAddress, routerAddress, account],

    queryFn: async () =>
      await tokenFetcher(tokenAddress, routerAddress, provider, account),

    enabled: Boolean(tokenAddress),
  });
};
