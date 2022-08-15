import type { BasicVault } from "../types/BasicVault";
import { VaultType, RiskLevel } from "../types/BasicVault";

const riskLevelApiUrl =
  "https://5tibkjdp8e.execute-api.ap-southeast-1.amazonaws.com/dev/risk";

interface RiskLevelResponse {
  Item: {
    pairs: {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      __Decimal__: string;
    };
  };
}

export const basicVaultRiskLevelFetcher = async (
  assetSymbol: BasicVault["assetSymbol"],
  type: BasicVault["type"]
): Promise<BasicVault["riskLevel"]> => {
  // convert WETH to ETH
  const formattedAssetSymbol = assetSymbol.startsWith("W")
    ? assetSymbol.slice(1)
    : assetSymbol;

  const formattedType = type === VaultType.CALL ? "C" : "P";

  const requestBody = {
    asset: `${formattedAssetSymbol}-${formattedType}`,
  };

  try {
    const response = await fetch(riskLevelApiUrl, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(requestBody),
    });

    const responseData = (await response.json()) as RiskLevelResponse;

    // eslint-disable-next-line no-underscore-dangle
    const riskLevel = responseData.Item.pairs.__Decimal__;

    if (riskLevel === "0") {
      return RiskLevel.LOW;
    }

    if (riskLevel === "1") {
      return RiskLevel.MEDIUM;
    }

    if (riskLevel === "2") {
      return RiskLevel.HIGH;
    }

    return null;
  } catch {
    return null;
  }
};
