import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

import { Tooltip } from "../../shared/components";
import { VaultStatusInfo } from "./VaultStatusInfo";
import { CurrentPositionInfo } from "./CurrentPositionInfo";
import { PendingPositionInfo } from "./PendingPositionInfo";

export const PositionInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery, lendingPoolReaderQuery } = useBasicModalConfig();

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

  const totalAPY = `${(annualPercentageYield + (Number(currentLiquidityRate) * 100)).toFixed(2)}%`;

  return (
    <Container>
      <InfoContainer>
      <Tooltip
          content={
            <div>
              <div>Premiums APY: {formattedAPY}</div>
              <div>Boost APY: {boostFormattedAPY}%</div>
              <div>Total APY: {totalAPY}</div>
            </div>
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
