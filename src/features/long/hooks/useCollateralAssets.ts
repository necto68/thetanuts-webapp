import { useQueries } from "react-query";
import { useWallet } from "@gimmixorg/use-wallet";

import { collateralAssetsMap } from "../constants";
import { ChainId, chainProvidersMap } from "../../wallet/constants";
import { collateralAssetFetcher } from "../helpers";
import { QueryType } from "../../shared/types";

export const useCollateralAssets = (collateralAssetsIds: string[]) => {
  const { account = "" } = useWallet();

  const tokensConfigs = collateralAssetsIds.map((collateralAssetId) => {
    const tokenConfig = collateralAssetsMap[collateralAssetId];

    const {
      chainId = ChainId.ETHEREUM,
      collateralAssetAddress = "",
      lendingPoolAddressesProviderAddress = "",
    } = tokenConfig?.source ?? {};

    const provider = chainProvidersMap[chainId];

    return {
      id: collateralAssetId,
      collateralAssetAddress,
      lendingPoolAddressesProviderAddress,
      provider,
    };
  });

  return useQueries(
    tokensConfigs.map(
      ({
        id,
        collateralAssetAddress,
        lendingPoolAddressesProviderAddress,
        provider,
      }) => ({
        queryKey: [
          QueryType.collateralAsset,
          id,
          collateralAssetAddress,
          lendingPoolAddressesProviderAddress,
          account,
        ],

        queryFn: async () =>
          await collateralAssetFetcher(
            id,
            collateralAssetAddress,
            lendingPoolAddressesProviderAddress,
            provider,
            account
          ),
      })
    )
  );
};
