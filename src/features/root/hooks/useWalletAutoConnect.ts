import { useEffect } from "react";
import { useConnectWallet, useWallets } from "@web3-onboard/react";

export const useWalletAutoConnect = () => {
  const [{ wallet }, connect] = useConnectWallet();
  const connectedWallets = useWallets();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (!connectedWallets) {
      void connect();
    }
  }, [wallet, connect, connectedWallets]);
};
