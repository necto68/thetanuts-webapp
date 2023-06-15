import type { BasicVaultConfig } from "./basicVaultConfig";

export interface LongVaultConfig extends BasicVaultConfig {
  chartSymbol: string;
  protocolDataProviderAddress: string;
  isForLongTrade?: boolean;
}
