import { useEffect } from "react";
import { useWallet } from "@gimmixorg/use-wallet";

export const useWalletAutoConnect = () => {
  const { account, connect, web3Modal } = useWallet();

  useEffect(() => {
    if (!account && web3Modal?.cachedProvider) {
      void connect();
    }
  }, [account, connect, web3Modal]);
};
