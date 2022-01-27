import Big from 'big.js';
import { Web3Provider } from '@ethersproject/providers';
import { Contract, ContractTransaction, ethers } from 'ethers';
import {
  uiContractsMap,
  ILVaultModes,
  vaultsMap,
  VaultTypes,
} from '../constants';
import {
  UI as UI_ABI,
  ASSET as ASSET_ABI,
  VAULT as VAULT_ABI,
  IL_VAULT as IL_VAULT_ABI,
  PRICE_FEED as PRICE_FEED_ABI,
} from '../constants/ABI';

import { convertToBig, getApy, normalizeVaultValue } from './utils';
import { Vault } from '../types';

export const vaultFetcher = async (
  vaultAddress: string,
  chainId: number,
  provider: Web3Provider | undefined,
): Promise<Vault | null> => {
  const localVault = vaultsMap[chainId].vaults.find(
    ({ address }) => address === vaultAddress,
  );

  if (!localVault) {
    return null;
  }

  if (!chainId || !provider) {
    return localVault;
  }

  const signer = provider.getSigner();
  const userAddress = signer.getAddress();

  const { address: uiContractAddress } = uiContractsMap[chainId];
  const uiContract = new Contract(uiContractAddress, UI_ABI, signer);

  const { type } = localVault;

  const isILVault = type === VaultTypes.IL;

  const vaultContract = new Contract(
    vaultAddress,
    isILVault ? IL_VAULT_ABI : VAULT_ABI,
    signer,
  );

  const vaultUI = await uiContract.getVaultInfo(vaultAddress);
  const myVaultPosition = await uiContract.myVaultPosition(vaultAddress);

  const epoch = convertToBig(await vaultContract.epoch()).toNumber();
  const expiry = convertToBig(await vaultContract.expiry()).toNumber() * 1000; // needs multiply by 1000 fo JS Date

  const queuedExitEpoch = convertToBig(myVaultPosition[5]).toNumber();

  const isEpochSettled = expiry === 0;
  const isEpochExpired = !isEpochSettled && Date.now() > expiry;
  const isReadyForWithdraw = isEpochSettled || epoch > queuedExitEpoch; // can be claimed only if current epoch is settled or next epoch was started

  let ILMode = undefined;

  if (isILVault) {
    const currentOptionType = isEpochSettled
      ? await vaultContract.optionType(epoch + 1)
      : await vaultContract.optionType(epoch);

    ILMode =
      currentOptionType === ILVaultModes.CALL
        ? ILVaultModes.CALL
        : ILVaultModes.PUT;
  }

  const depositAssetAddress = await vaultContract.COLLAT();
  const depositAssetContract = new ethers.Contract(
    depositAssetAddress,
    ASSET_ABI,
    signer,
  );

  const userBalance = await depositAssetContract.balanceOf(userAddress);
  const userAllowance = await depositAssetContract.allowance(
    userAddress,
    vaultAddress,
  );

  const assetSymbol = (await vaultContract.name()).split(' ').splice(-2, 1)[0]; // equals to .at(-2)

  const assetDecimals = await depositAssetContract.decimals();
  const depositSymbol = await depositAssetContract.symbol();

  const priceFeedAddress = await vaultContract.PRICE_FEED();
  const linkAggregator = await vaultContract.LINK_AGGREGATOR();
  const priceFeedContract = new Contract(
    priceFeedAddress,
    PRICE_FEED_ABI,
    signer,
  );

  const vaultMaxDeposit = convertToBig(vaultUI.max_deposit);
  const vaultTotalDeposit = convertToBig(vaultUI.total_deposit);
  const vaultTotalAsset = convertToBig(vaultUI.total_asset);
  const vaultPremium = convertToBig(vaultUI.premium);
  const vaultPeriod = convertToBig(await vaultContract.PERIOD());

  const vaultAssetPrice = convertToBig(
    await priceFeedContract.getLatestPriceX1e6(linkAggregator),
  );
  const vaultStrikePrice = convertToBig(await vaultContract.strikeX1e6(epoch));

  //   from: '0xb8dD07Ef9Ed7090cCE388D9d2772B1291265E72F',

  const apy = getApy(vaultTotalAsset, vaultPremium, vaultPeriod);

  const assetDivisor = Big(10).pow(assetDecimals);
  const priceDivisor = Big(10).pow(6);

  const currentDeposit = vaultTotalDeposit
    .add(vaultTotalAsset)
    .add(vaultPremium)
    .div(assetDivisor);

  const maxDeposit = vaultMaxDeposit.div(assetDivisor);

  const userPosition = convertToBig(myVaultPosition[7]).div(assetDivisor);
  const userPendingWithdrawal = convertToBig(myVaultPosition[2]).div(
    assetDivisor,
  );

  const userWalletBalance = convertToBig(userBalance).div(assetDivisor);
  const userWalletAllowance = convertToBig(userAllowance).div(assetDivisor);

  const assetPrice = normalizeVaultValue(vaultAssetPrice, priceDivisor);
  const strikePrice =
    isEpochSettled || isEpochExpired
      ? null // strike price is not valid until epoch was started
      : normalizeVaultValue(vaultStrikePrice, priceDivisor);

  return {
    ...localVault,
    ILMode,
    apy,
    expiry,
    isEpochSettled,
    isEpochExpired,
    isReadyForWithdraw,
    assetSymbol,
    depositSymbol,
    currentDeposit,
    maxDeposit,
    userPosition,
    userPendingWithdrawal,
    userWalletBalance,
    userWalletAllowance,
    assetPrice,
    strikePrice,
    approvePermanent: (): Promise<ContractTransaction> => {
      const weiAmount =
        '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'; // 2^256-1

      return depositAssetContract.approve(vaultAddress, weiAmount);
    },
    approve: async (amount: string): Promise<ContractTransaction> => {
      const weiAmount = Big(amount).mul(assetDivisor).toString();

      return depositAssetContract.approve(vaultAddress, weiAmount);
    },
    deposit: async (amount: string): Promise<ContractTransaction> => {
      const weiAmount = Big(amount).mul(assetDivisor).toString();

      return vaultContract.deposit(weiAmount);
    },
    initWithdraw: async (amount: string): Promise<ContractTransaction> => {
      const assetAmount = Big(amount);

      const valuePerLPX1e18 = convertToBig(
        await vaultContract.valuePerLPX1e18(epoch),
      );
      const valuePerLP = valuePerLPX1e18.div(Big(10).pow(18));

      const LPAmount = assetAmount.div(valuePerLP);
      const weiLPAmount = LPAmount.mul(assetDivisor).round(0).toString();

      return vaultContract.initWithdraw(weiLPAmount);
    },
    cancelWithdraw: async (): Promise<ContractTransaction> => {
      const weiAmount = '0';

      return vaultContract.initWithdraw(weiAmount);
    },
    withdraw: async (): Promise<ContractTransaction> => {
      return vaultContract.withdraw();
    },
  };
};
