import { useWallet } from "@gimmixorg/use-wallet";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import { useEffect } from "react";

import { isTestEnvironment } from "../../shared/constants";
import { logRocketId } from "../constants";

export const useInitLogRocket = () => {
  const { account } = useWallet();

  useEffect(() => {
    if (!isTestEnvironment) {
      LogRocket.init(logRocketId);
      setupLogRocketReact(LogRocket);
    }
  }, []);

  useEffect(() => {
    if (!isTestEnvironment && account) {
      LogRocket.identify(account, {
        walletAddress: account,
      });
    }
  }, [account]);
};
