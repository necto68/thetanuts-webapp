import { useWallet } from "../../wallet/hooks/useWallet";
import { useVaultModalState } from "../../modal/hooks";
import { useBasicVault, useBasicVaultReader } from "../../basic-vault/hooks";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";

export const useBasicModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();

  const basicVaultQuery = useBasicVault(vaultId);
  const basicVaultReaderQuery = useBasicVaultReader(vaultId);

  const { walletChainId, walletProvider } = useWallet();

  const { data } = basicVaultQuery;
  const {
    chainId: basicVaultChainId = ChainId.ETHEREUM,
    basicVaultAddress = "",
    basicVaultType = BasicVaultType.BASIC,
    collateralTokenAddress = "",
    isSupportDepositor = false,
  } = data ?? {};

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
  const spenderAddress = isSupportDepositor
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
