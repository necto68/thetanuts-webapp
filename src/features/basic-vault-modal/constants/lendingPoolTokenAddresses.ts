import type { LendingPoolTokenConfig } from "../types";

export const LPOOL_ADDRESS = "0x7f36bc14e5b5c9c712c9b738563a57a784dd4d93";

export const lendingPoolTokenAddresses: LendingPoolTokenConfig[] = [
  // polygon - matic call
  {
    id: "TN-CSCCv1-MATICUSD",

    source: {
      suppliedTokenAddress: "0x53F02b56822C0FD9Eb97559FA28d2243ce2A1C1C",
    },
  },
]
