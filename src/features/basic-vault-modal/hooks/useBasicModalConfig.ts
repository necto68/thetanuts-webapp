import { useWallet } from "@gimmixorg/use-wallet";

import { useVaultModalState } from "../../modal/hooks";
import { useBasicVault, useBasicVaultReader } from "../../basic-vault/hooks";
import { ChainId, chainProvidersMap, chainsMap } from "../../wallet/constants";
import { BasicVaultType } from "../../basic/types";

export const useBasicModalConfig = () => {
  const [{ vaultId }] = useVaultModalState();

  const basicVaultQuery = useBasicVault(vaultId);
  const basicVaultReaderQuery = useBasicVaultReader(vaultId);

  const { network, provider: walletProvider } = useWallet();

  const { data } = basicVaultQuery;
  const {
    chainId: basicVaultChainId = ChainId.ETHEREUM,
    basicVaultAddress = "",
    basicVaultType = BasicVaultType.BASIC,
    collateralTokenAddress = "",
  } = data ?? {};
  const walletChainId: ChainId = network?.chainId ?? 0;

  const { routerAddress, basicVaultDepositorAddress } =
    chainsMap[basicVaultChainId].addresses;

  const spenderAddress =
    basicVaultType === BasicVaultType.BASIC
      ? basicVaultAddress
      : basicVaultDepositorAddress;

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
