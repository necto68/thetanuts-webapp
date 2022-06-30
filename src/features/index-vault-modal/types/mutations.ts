export enum MutationType {
  swapExactTokensForTokens = "swapExactTokensForTokens",
  swapTokensForExactTokens = "swapTokensForExactTokens",

  swapExactTokensForETH = "swapExactTokensForETH",
  swapTokensForExactETH = "swapTokensForExactETH",

  swapExactETHForTokens = "swapExactETHForTokens",
  swapETHForExactTokens = "swapETHForExactTokens",

  deposit = "deposit",

  directWithdraw = "withdraw",
  withdrawClaim = "redeem",

  depositNative = "depositNative",
}

export interface MutationError {
  message: string;
  data?: { code: number; message: string };
}
