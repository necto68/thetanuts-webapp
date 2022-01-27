import { useQueries } from 'react-query';
import { useWallet } from '@gimmixorg/use-wallet';
import { ChainIds } from '../../wallet/constants';
import { vaultsMap } from '../constants';
import { vaultFetcher } from '../helpers';
import { Vault } from '../types';
import { useMemo } from 'react';

export const useVaults = (): Vault[] => {
  const { account, network, provider } = useWallet();
  const chainId = network?.chainId ?? ChainIds.ETHEREUM;
  const localVaults = vaultsMap[chainId]?.vaults ?? [];

  const queries = useQueries(
    localVaults.map((vault) => ({
      queryKey: [vault.address, chainId],
      queryFn: () => vaultFetcher(vault.address, chainId, provider),
      placeholderData: vault,
      enabled: Boolean(account && provider),
    })),
  );

  return useMemo(() => queries.map(({ data }) => data as Vault), [queries]);
};
