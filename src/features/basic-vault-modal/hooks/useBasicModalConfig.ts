import { useWallet } from "@gimmixorg/use-wallet";

import { useVaultModalState } from "../../modal/hooks";
import { useBasicVault, useBasicVaultReader } from "../../basic-vault/hooks";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";
import { basicVaultsIdsThatSupportDepositor } from "../../basic/constants/basicVaults";

export const useBasicModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();

  const basicVaultQuery = useBasicVault(vaultId);
  const basicVaultReaderQuery = useBasicVaultReader(vaultId);

  const { network, provider: walletProvider } = useWallet();

  const { data } = basicVaultQuery;
  const {
    id = "",
    chainId: basicVaultChainId = ChainId.ETHEREUM,
    basicVaultAddress = "",
    basicVaultType = BasicVaultType.BASIC,
    collateralTokenAddress = "",
  } = data ?? {};
  const walletChainId: ChainId = network?.chainId ?? 0;

  const {
    routerAddress,
    basicVaultDepositorAddress,
    longVaultPositionManagerAddress,
  } = chainsMap[basicVaultChainId].addresses;

  const spenderAddressesByBasicVaultType = {
    [BasicVaultType.BASIC]: basicVaultAddress,
    [BasicVaultType.DEGEN]: basicVaultDepositorAddress,
    [BasicVaultType.WHEEL]: basicVaultAddress,
    [BasicVaultType.LONG]: longVaultPositionManagerAddress,
  };

  // TODO: Remove this when we support depositor for all basic vaults
  // const spenderAddress = spenderAddressesByBasicVaultType[basicVaultType];
  const spenderAddress = basicVaultsIdsThatSupportDepositor.includes(id)
    ? basicVaultDepositorAddress
    : spenderAddressesByBasicVaultType[basicVaultType];

  const provider = chainProvidersMap[basicVaultChainId];

  return {
    walletChainId,
    basicVaultAddress,

    collateralTokenAddress,

    routerAddress,
    basicVaultDepositorAddress,

    spenderAddress,

    provider,
    walletProvider,

    basicVaultChainId,

    basicVaultQuery,
    basicVaultReaderQuery,
  };
};
