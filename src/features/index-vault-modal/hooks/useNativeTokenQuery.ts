import type { Provider } from "@ethersproject/providers";
import { useQuery } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { nativeTokenFetcher } from "../helpers";
import { QueryType } from "../../shared/types";

export const useNativeTokenQuery = (
  routerAddress: string,
  provider: Provider
) => {
  const { account = "" } = useWallet();

  return useQuery({
    queryKey: [QueryType.nativeToken, routerAddress, account],

    queryFn: async () =>
      await nativeTokenFetcher(routerAddress, provider, account),
  });
};
