import Big from "big.js";

export const isNumberValid = (input: string) =>
  !Number.isNaN(Number.parseFloat(input));

export const isValidForBig = (input: string): boolean => {
  try {
    return Boolean(new Big(input));
  } catch {
    return false;
  }
};
