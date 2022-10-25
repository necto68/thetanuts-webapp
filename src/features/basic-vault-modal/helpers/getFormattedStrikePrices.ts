import type { BasicVault } from "../../basic-vault/types";
import { VaultType } from "../../basic-vault/types";
import { strikePriceFormatter } from "../../shared/helpers";

export const getFormattedStrikePrices = (
  type: BasicVault["type"],
  strikePrices: BasicVault["strikePrices"]
) => {
  if (type === VaultType.CONDOR) {
    const [formattedStrikePrice0, formattedStrikePrice1] =
      strikePrices.map(strikePriceFormatter);

    return `${formattedStrikePrice0} P - ${formattedStrikePrice1} C`;
  }

  const postix = type === VaultType.PUT ? "P" : "C";

  return `${strikePriceFormatter(strikePrices[0])} ${postix}`;
};
