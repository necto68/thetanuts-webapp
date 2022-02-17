import type { Provider } from "@ethersproject/providers";
import { useQuery } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { nativeTokenFetcher } from "../helpers";

export const useNativeTokenQuery = (
  routerAddress: string,
  provider: Provider
) => {
  const { account = "" } = useWallet();

  return useQuery({
    queryKey: [routerAddress, account],

    queryFn: async () =>
      await nativeTokenFetcher(routerAddress, provider, account),
  });
};
