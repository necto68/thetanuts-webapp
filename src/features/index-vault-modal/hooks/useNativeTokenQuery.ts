import type { Provider } from "@ethersproject/providers";
import { useQuery } from "react-query";
import { useConnectWallet } from "@web3-onboard/react";

import { nativeTokenFetcher } from "../helpers";
import { QueryType } from "../../shared/types";

export const useNativeTokenQuery = (
  routerAddress: string,
  provider: Provider
) => {
  const [{ wallet }] = useConnectWallet();
  const walletAddress = wallet?.accounts[0]?.address ?? "";

  return useQuery({
    queryKey: [QueryType.nativeToken, routerAddress, walletAddress],

    queryFn: async () =>
      await nativeTokenFetcher(routerAddress, provider, walletAddress),
  });
};
