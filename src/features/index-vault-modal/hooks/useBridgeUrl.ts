import { useWallet } from "../../wallet/hooks";
import { ChainId } from "../../wallet/constants";
import { TokenSymbol } from "../types/tokenSymbol";

import { useSwapRouterState } from "./useSwapRouterState";

const USDBridges = {
  [ChainId.ETHEREUM]: "https://stargate.finance/transfer",
  [ChainId.POLYGON]: "https://wallet.polygon.technology/bridge/",
  [ChainId.BSC]: "https://stargate.finance/transfer",
  [ChainId.AVALANCHE]: "https://stargate.finance/transfer",
  [ChainId.FANTOM]: "https://app.multichain.org/#/router",
};

const ETHBridges = {
  [ChainId.ETHEREUM]: "https://stargate.finance/transfer",
  [ChainId.POLYGON]: "https://wallet.polygon.technology/bridge/",
  [ChainId.BSC]: "https://www.bnbchain.org/en/bridge",
  [ChainId.AVALANCHE]: "https://bridge.avax.network",
  [ChainId.FANTOM]: "https://app.multichain.org/#/router",
};

const BTCBridges = {
  [ChainId.ETHEREUM]: "https://portalbridge.com/#/transfer",
  [ChainId.POLYGON]: "https://wallet.polygon.technology/bridge/",
  [ChainId.BSC]: "https://www.bnbchain.org/en/bridge",
  [ChainId.AVALANCHE]: "https://bridge.avax.network",
  [ChainId.FANTOM]: "https://app.multichain.org/#/router",
};

export const BridgeBySymbolByChain: Record<string, Record<number, string>> = {
  [TokenSymbol.USDC]: USDBridges,
  [TokenSymbol.BUSD]: USDBridges,

  [TokenSymbol.ETH]: ETHBridges,
  [TokenSymbol.WETH]: ETHBridges,
  [TokenSymbol["WETH.e"]]: ETHBridges,

  [TokenSymbol.BTC]: BTCBridges,
  [TokenSymbol.WBTC]: BTCBridges,
  [TokenSymbol.BTCB]: BTCBridges,
  [TokenSymbol["WBTC.e"]]: BTCBridges,
};

export const DefaultBridge = "https://portalbridge.com/#/transfer";

export const getBridgeByChainAndSymbol = (chain: number, symbol: string) => {
  if (symbol.includes("index")) {
    return DefaultBridge;
  }
  return chain && symbol ? BridgeBySymbolByChain[symbol][chain] : DefaultBridge;
};

export const useBridgeUrl = () => {
  const { walletChainId } = useWallet();

  const chainId = walletChainId;

  const { sourceData } = useSwapRouterState();
  const { symbol = TokenSymbol.ETH } = sourceData ?? {};

  return getBridgeByChainAndSymbol(chainId, symbol);
};
