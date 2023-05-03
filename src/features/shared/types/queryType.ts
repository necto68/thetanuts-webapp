export enum QueryType {
  metrics = "metrics",

  indexVault = "indexVault",
  middleIndexPrice = "middleIndexPrice",

  directWithdrawData = "directWithdrawData",
  directWithdrawRateData = "directWithdrawRateData",
  unclaimedBalance = "unclaimedBalance",

  basicVault = "basicVault",
  basicVaultReader = "basicVaultReader",
  lendingPoolReader = "lendingPoolReader",

  riskLevel = "riskLevel",

  token = "token",
  nativeToken = "nativeToken",

  indexTokens = "indexTokens",

  collateralAsset = "collateralAsset",
  longVaultReader = "longVaultReader",

  chainIndexSwapsHistory = "chainIndexSwapsHistory",
  indexDepositsHistory = "indexDepositsHistory",
  indexWithdrawalsHistory = "indexWithdrawalsHistory",
  indexRedeemsHistory = "indexRedeemsHistory",

  basicHistory = "basicHistory",
}
