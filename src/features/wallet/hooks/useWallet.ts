import { useConnectWallet } from "@web3-onboard/react";
import { Web3Provider } from "@ethersproject/providers";

import type { ChainId } from "../constants";

export const useWallet = () => {
  const [
    { wallet },
    connect,
    disconnect,
    updateBalances,
    setWalletModules,
    setPrimaryWallet,
  ] = useConnectWallet();

  const walletChainId: ChainId = Number.parseInt(
    wallet?.chains[0]?.id ?? "0",
    16
  );
  const walletAddress = wallet?.accounts[0]?.address ?? "";
  const walletProvider = wallet?.provider
    ? new Web3Provider(wallet.provider, "any")
    : undefined;

  return {
    wallet,
    connect,
    disconnect,
    updateBalances,
    setWalletModules,
    setPrimaryWallet,
    walletChainId,
    walletAddress,
    walletProvider,
  };
};
