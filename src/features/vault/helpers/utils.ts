import Big from 'big.js';
import { BigNumber } from 'ethers';
import { Vault } from '../types';

export const convertToBig = (value: BigNumber): Big => Big(value.toString());

export const normalizeVaultValue = (
  value: Big,
  divisor: Big,
  roundDP: number = 2,
): number => value.div(divisor).round(roundDP).toNumber();

export const getApy = (totalAsset: Big, premium: Big, period: Big): number => {
  if (totalAsset.eq(0)) {
    return 0;
  }

  const secondsPerYear = Big(60 * 60 * 24 * 365);

  return Big(1)
    .add(premium.div(totalAsset))
    .pow(secondsPerYear.div(period).round().toNumber())
    .sub(1)
    .mul(100)
    .round(2)
    .toNumber();
};

export const getCurrentDepositRate = (
  currentDeposit: Vault['currentDeposit'],
  maxDeposit: Vault['maxDeposit'],
): number | null =>
  currentDeposit && maxDeposit && maxDeposit.gt(0)
    ? currentDeposit.div(maxDeposit).mul(100).round(2).toNumber()
    : null;
