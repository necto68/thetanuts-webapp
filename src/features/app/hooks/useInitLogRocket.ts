import { useEffect } from "react";
import { useConnectWallet } from "@web3-onboard/react";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

import { isTestEnvironment } from "../../shared/constants";
import { logRocketId } from "../constants";

export const useInitLogRocket = () => {
  const [{ wallet }] = useConnectWallet();
  const walletAddress = wallet?.accounts[0]?.address ?? "";

  useEffect(() => {
    if (!isTestEnvironment) {
      LogRocket.init(logRocketId);
      setupLogRocketReact(LogRocket);
    }
  }, []);

  useEffect(() => {
    if (!isTestEnvironment && wallet) {
      LogRocket.identify(walletAddress, {
        walletAddress,
      });
    }
  }, [wallet, walletAddress]);
};
