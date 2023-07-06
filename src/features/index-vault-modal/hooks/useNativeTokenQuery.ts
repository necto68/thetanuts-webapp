import type { Provider } from "@ethersproject/providers";
import { useQuery } from "react-query";

import { useWallet } from "../../wallet/hooks/useWallet";
import { nativeTokenFetcher } from "../helpers";
import { QueryType } from "../../shared/types";

export const useNativeTokenQuery = (
  routerAddress: string,
  provider: Provider
) => {
  const { walletAddress } = useWallet();

  return useQuery({
    queryKey: [QueryType.nativeToken, routerAddress, walletAddress],

    queryFn: async () =>
      await nativeTokenFetcher(routerAddress, provider, walletAddress),
  });
};
