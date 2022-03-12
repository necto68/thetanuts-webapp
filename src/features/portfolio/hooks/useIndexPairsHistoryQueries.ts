import { useQueries } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { indexPairsHistoryFetcher } from "../helpers";
import { useIndexVaults } from "../../index-vault/hooks/useIndexVaults";

export const useIndexPairsHistoryQueries = (indexVaultIds: string[]) => {
  const { account = "" } = useWallet();

  const indexVaultsQueries = useIndexVaults(indexVaultIds);

  return useQueries(
    indexVaultsQueries.map(({ data }) => {
      const {
        id = "",
        assetTokenAddress = "",
        indexTokenAddress = "",
      } = data ?? {};

      return {
        queryKey: [id, assetTokenAddress, indexTokenAddress, account],

        queryFn: async () =>
          await indexPairsHistoryFetcher(
            id,
            assetTokenAddress,
            indexTokenAddress,
            account
          ),

        enabled: Boolean(data),
      };
    })
  );
};
