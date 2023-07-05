import { useQueries } from "react-query";
import { useConnectWallet } from "@web3-onboard/react";

import { collateralAssetsMap } from "../constants";
import { ChainId, chainProvidersMap } from "../../wallet/constants";
import { collateralAssetFetcher } from "../helpers";
import { QueryType } from "../../shared/types";

export const useCollateralAssets = (collateralAssetsIds: string[]) => {
  const [{ wallet }] = useConnectWallet();
  const walletAddress = wallet?.accounts[0]?.address ?? "";

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
          walletAddress,
        ],

        queryFn: async () =>
          await collateralAssetFetcher(
            id,
            collateralAssetAddress,
            lendingPoolAddressesProviderAddress,
            provider,
            walletAddress
          ),
      })
    )
  );
};
