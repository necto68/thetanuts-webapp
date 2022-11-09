import { useBasicModalConfig } from "../hooks/useBasicModalConfig";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

import { VaultStatusInfo } from "./VaultStatusInfo";
import { CurrentPositionInfo } from "./CurrentPositionInfo";
import { PendingPositionInfo } from "./PendingPositionInfo";

export const PositionInfo = () => {
  const { basicVaultQuery, basicVaultReaderQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { isLoading: isBasicVaultReaderLoading } = basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const { annualPercentageYield = 0 } = basicVaultData ?? {};

  const loadingPlaceholder = ".....";

  const formattedAPY = `${annualPercentageYield}%`;

  return (
    <Container>
      <VaultStatusInfo />
      <CurrentPositionInfo />
      <PendingPositionInfo />
      <InfoContainer>
        <InfoTitle>Projected APY%</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedAPY}
        </InfoValue>
      </InfoContainer>
    </Container>
  );
};
