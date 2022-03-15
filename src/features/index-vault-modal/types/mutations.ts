export enum MutationType {
  swapExactTokensForTokens = "swapExactTokensForTokens",
  swapTokensForExactTokens = "swapTokensForExactTokens",

  swapExactTokensForETH = "swapExactTokensForETH",
  swapTokensForExactETH = "swapTokensForExactETH",

  swapExactETHForTokens = "swapExactETHForTokens",
  swapETHForExactTokens = "swapETHForExactTokens",

  deposit = "deposit",
  depositNative = "depositNative",
}

export interface MutationError {
  message: string;
  data?: { code: number; message: string };
}
