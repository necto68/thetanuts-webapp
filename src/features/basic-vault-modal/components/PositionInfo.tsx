import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
  TooltipContentContainer,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { Tooltip } from "../../shared/components";
import { TooltipText } from "../../shared/components/Tooltip.styles";

import { VaultStatusInfo } from "./VaultStatusInfo";
import { CurrentPositionInfo } from "./CurrentPositionInfo";
import { PendingPositionInfo } from "./PendingPositionInfo";

export const PositionInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery, lendingPoolReaderQuery } =
    useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { isLoading: isBasicVaultReaderLoading } = basicVaultReaderQuery;
  const { data: lendingPoolReaderData } = lendingPoolReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const { annualPercentageYield = 0 } = basicVaultData ?? {};
  const loadingPlaceholder = ".....";
  const formattedAPY = `${annualPercentageYield}%`;

  const { currentLiquidityRate = 0 } = lendingPoolReaderData ?? {};
  const boostFormattedAPY = (Number(currentLiquidityRate) * 100).toFixed(2);

  const totalAPY = `${(
    annualPercentageYield +
    Number(currentLiquidityRate) * 100
  ).toFixed(2)}%`;

  return (
    <Container>
      <InfoContainer>
        <Tooltip
          content={
            <TooltipContentContainer>
              <TooltipText>{`Premiums APY: ${formattedAPY}`}</TooltipText>
              <TooltipText>{`Boost APY: ${boostFormattedAPY}%`} </TooltipText>
              <TooltipText>{`Total APY: ${totalAPY}`}</TooltipText>
            </TooltipContentContainer>
          }
          id="ApyWithBoost"
          root={<InfoTitle>Projected APY%</InfoTitle>}
        />

        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : totalAPY}
        </InfoValue>
      </InfoContainer>
      <VaultStatusInfo />
      <PendingPositionInfo />
      <CurrentPositionInfo />
    </Container>
  );
};
