import type { FC } from "react";

import type { Token, NativeToken } from "../types";
import { useSwapRouterConfig } from "../hooks";
import { InfoIcon, Tooltip } from "../../shared/components";
import { chainsMap } from "../../wallet/constants";
import { useWithdrawDataQuery } from "../hooks/useWithdrawDataQuery";

import {
  Container,
  InfoContainer,
  InfoTitleContainer,
  InfoTitle,
  InfoValue,
} from "./VaultInfo.styles";

interface VaultWithdrawInfoProps {
  targetTokenData: NativeToken | Token | undefined;
}

export const VaultWithdrawInfo: FC<VaultWithdrawInfoProps> = ({
  targetTokenData,
}) => {
  const { indexVaultQuery } = useSwapRouterConfig();
  const { data } = indexVaultQuery;

  const { chainId = 1 } = data ?? {};

  const { symbol } = targetTokenData ?? {};

  const { data: withdrawData } = useWithdrawDataQuery();

  return (
    <Container>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Full Withdraw Schedule</InfoTitle>
          <Tooltip
            content="Refers to the expiration date of the last individual option vault in the stronghold"
            id="fullWithdrawDate"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoValue isAlignRight>
          {withdrawData?.formattedLastVaultExpiry}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Main Network</InfoTitle>
        <InfoValue isAlignRight>{chainsMap[chainId].title}</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Max Projected Withdraw Amount</InfoTitle>
          <Tooltip
            content="Refers to the maximum projected withdrawn amount  of all of the individual option vaults in the stronghold upon expiry"
            id="maxProjectedWithdrawAmount"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoValue isAlignRight>
          {withdrawData?.maxProjectedWithdraw ?? 0} {symbol}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitleContainer>
          <InfoTitle>Pending Withdraw Balance</InfoTitle>
          <Tooltip
            content="Refers to the total withdrawal amount in the remaining “on-going” individual option vaults"
            id="pendingWithdrawBalance"
            root={<InfoIcon />}
          />
        </InfoTitleContainer>
        <InfoValue isAlignRight>
          {withdrawData?.pendingWithdraw ?? 0} {symbol}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Claimable Withdraw Balance</InfoTitle>
        <InfoValue isAlignRight>
          {withdrawData?.claimableBalance ?? 0} {symbol}
        </InfoValue>
      </InfoContainer>
    </Container>
  );
};
