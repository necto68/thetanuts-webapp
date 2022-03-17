import type { ReactNode } from "react";
import { createElement } from "react";

import { logosMap } from "../constants";

export const getLogoBySymbol = (symbol?: string): ReactNode => {
  if (!symbol) {
    return null;
  }

  let assetLogo = null;

  if (symbol in logosMap) {
    assetLogo = logosMap[symbol];
  }

  if (symbol.startsWith("W")) {
    const nativeAssetSymbol = symbol.slice(1);

    if (nativeAssetSymbol in logosMap) {
      assetLogo = logosMap[nativeAssetSymbol];
    }
  }

  return assetLogo ? createElement(assetLogo) : null;
};
