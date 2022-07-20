import type { FC } from "react";
import { useEffect, useState } from "react";

import type { Token, NativeToken } from "../types";
import { useWithdrawDataQuery } from "../hooks";
import { InfoIcon, Tooltip } from "../../shared/components";

import {
  Container,
  InfoContainer,
  InfoTitleContainer,
  InfoTitle,
  InfoValue,
} from "./VaultInfo.styles";
import { SwapRate } from "./SwapRate";

interface VaultWithdrawInfoProps {
  isSourceTokenDataLoading: boolean;
  isTargetTokenDataLoading: boolean;
  sourceTokenData: NativeToken | Token | undefined;
  targetTokenData: NativeToken | Token | undefined;
}

export const VaultWithdrawInfo: FC<VaultWithdrawInfoProps> = ({
  isSourceTokenDataLoading,
  isTargetTokenDataLoading,
  sourceTokenData,
  targetTokenData,
}) => {
  const { data: withdrawData } = useWithdrawDataQuery();
  const { expectedSum, rates } = withdrawData ?? {};

  // Define token symbol.
  const { symbol } = targetTokenData ?? {};

  const [maxProjectedWithdraw, setMaxProjectedWithdraw] = useState("...");

  useEffect(() => {
    setMaxProjectedWithdraw(expectedSum ?? "...");
  }, [expectedSum]);

  // Prepare withdraw rates.
  const withdrawRates = [
    rates?.[0]?.toFixed(5) ?? "...",
    rates?.[1]?.toFixed(5),
  ];

  return (
    <Container>
      <SwapRate
        customRates={withdrawRates}
        disabled
        isSourceTokenDataLoading={isSourceTokenDataLoading}
        isTargetTokenDataLoading={isTargetTokenDataLoading}
        sourceTokenData={sourceTokenData}
        targetTokenData={targetTokenData}
        title="Max Projected Rate"
        tooltip="Refers to the maximum rate between the index token
and the asset if none of the individual option vault(s) in
the stronghold is ITM"
      />
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Max Projected Withdraw Balance</InfoTitle>
          <Tooltip
            content="Refers to the total withdraw amount of all of the
unexpired individual option vault(s) in the stronghold
given that none are ITM."
            id="maxProjectedWithdrawAmount"
            place="top"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoValue isAlignRight>
          {maxProjectedWithdraw} {symbol}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Total Claimed Amount</InfoTitle>
          <Tooltip
            content="Refers to the total amount that you can claim from
the individual option vaults that have expired"
            id="totalClaimAmount"
            place="top"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoValue isAlignRight>
          {withdrawData?.totalClaimed ?? 0} {symbol}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Full Withdraw Schedule</InfoTitle>
          <Tooltip
            content="This shows the longest expiry date of the individual
option vault in the stronghold"
            id="fullWithdrawDate"
            place="top"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoValue isAlignRight>
          {withdrawData?.formattedLastVaultExpiry}
        </InfoValue>
      </InfoContainer>
    </Container>
  );
};
