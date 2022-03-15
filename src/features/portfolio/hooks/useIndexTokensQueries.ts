import { useQueries } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { indexTokensFetcher } from "../helpers";
import { useIndexVaults } from "../../index-vault/hooks";

export const useIndexTokensQueries = (indexVaultIds: string[]) => {
  const { account = "" } = useWallet();

  const indexVaultsQueries = useIndexVaults(indexVaultIds);

  return useQueries(
    indexVaultsQueries.map(({ data }) => {
      const { id = "", indexTokenAddress = "" } = data ?? {};

      return {
        queryKey: [id, indexTokenAddress, account],

        queryFn: async () =>
          await indexTokensFetcher(id, indexTokenAddress, account),

        enabled: Boolean(data),
      };
    })
  );
};
