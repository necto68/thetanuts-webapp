import { VaultType } from "../../basic-vault/types";
import type { BasicVault } from "../../basic-vault/types";
import { strikePriceFormatter } from "../../shared/helpers";
import { getBasicVaultStatusTitle } from "../../basic-vault/helpers";

export const getFormattedStrikePrices = (
  type: BasicVault["type"],
  strikePrices: BasicVault["strikePrices"],
  isSettled: BasicVault["isSettled"],
  isExpired: BasicVault["isExpired"],
  isAllowInteractions: BasicVault["isAllowInteractions"]
) => {
  const basicVaultStatusTitle = getBasicVaultStatusTitle(
    isSettled,
    isExpired,
    isAllowInteractions
  );

  if (basicVaultStatusTitle) {
    return basicVaultStatusTitle;
  }

  if (type === VaultType.CONDOR) {
    const [formattedStrikePrice0, formattedStrikePrice1] =
      strikePrices.map(strikePriceFormatter);

    return `${formattedStrikePrice0} / ${formattedStrikePrice1}`;
  }

  return strikePriceFormatter(strikePrices[0]);
};
