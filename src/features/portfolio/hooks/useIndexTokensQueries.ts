import { useQueries } from "react-query";
import { useConnectWallet } from "@web3-onboard/react";

import { indexTokensFetcher } from "../helpers";
import { useIndexVaults } from "../../index-vault/hooks";
import { QueryType } from "../../shared/types";

export const useIndexTokensQueries = (indexVaultIds: string[]) => {
  const [{ wallet }] = useConnectWallet();
  const walletAddress = wallet?.accounts[0]?.address ?? "";

  const indexVaultsQueries = useIndexVaults(indexVaultIds);

  return useQueries(
    indexVaultsQueries.map(({ data }) => {
      const { id = "", indexTokenAddress = "" } = data ?? {};

      return {
        queryKey: [QueryType.indexTokens, id, indexTokenAddress, walletAddress],

        queryFn: async () =>
          await indexTokensFetcher(id, indexTokenAddress, walletAddress),

        enabled: Boolean(data),
      };
    })
  );
};
