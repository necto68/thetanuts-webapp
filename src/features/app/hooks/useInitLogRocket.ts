import { useEffect } from "react";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

import { useWallet } from "../../wallet/hooks/useWallet";
import { isTestEnvironment } from "../../shared/constants";
import { logRocketId } from "../constants";

export const useInitLogRocket = () => {
  const { wallet, walletAddress } = useWallet();

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
