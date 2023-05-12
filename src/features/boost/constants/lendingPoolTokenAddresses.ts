import type { LendingPoolTokenConfig } from "../types";
import { ChainId } from "../../wallet/constants";

export const lendingPoolTokenAddresses: LendingPoolTokenConfig[] = [
  {
    id: "TN-CSCCv1-MATICUSD",
    sid: "sTN-CSCCv1-MATICUSD",

    source: {
      chainId: ChainId.POLYGON,
      suppliedTokenAddress: "0x53F02b56822C0FD9Eb97559FA28d2243ce2A1C1C",
    },
  },
];
