import { useConnectWallet } from "@web3-onboard/react";
import { ethers } from "ethers";

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
    ? new ethers.providers.Web3Provider(wallet.provider)
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
