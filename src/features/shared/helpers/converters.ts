import type { BigNumber } from "ethers";
import Big from "big.js";

export const convertToBig = (value: BigNumber): Big =>
  new Big(value.toString());
