import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { VaultType } from "../../basic-vault/types";
import { useLongModalConfig } from "../../long-vault-modal/hooks";
import {
  getLongOptionTokenTitle,
  getLongOptionTokenSymbol,
} from "../../table/helpers";
import type { LongOptionPositionRow } from "../types";

export const useLongOptionPositions = (): (
  | LongOptionPositionRow
  | undefined
)[] => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { longVaultReaderQuery } = useLongModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;

  const { data: longVaultReaderData, isLoading: isLongVaultReaderLoading } =
    longVaultReaderQuery;

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    expiry = 0,
    strikePrices = [0],
  } = basicVaultData ?? {};

  const { debtToken } = longVaultReaderData ?? {};

  const isLoading = isBasicVaultLoading || isLongVaultReaderLoading;

  if (isLoading) {
    return [undefined];
  }

  if (!debtToken || !debtToken.balance || debtToken.balance.eq(0)) {
    return [];
  }

  const optionTitle = getLongOptionTokenTitle(
    type,
    assetSymbol,
    expiry,
    strikePrices
  );
  const optionSymbol = getLongOptionTokenSymbol(type, assetSymbol);

  return [
    {
      id: debtToken.tokenAddress,
      title: optionTitle,
      side: "Long",
      size: debtToken.balance,
      symbol: optionSymbol,
    },
  ];
};
