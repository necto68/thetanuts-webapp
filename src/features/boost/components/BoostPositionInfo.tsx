import { useBasicModalConfig } from "../../basic-vault-modal/hooks/useBasicModalConfig";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

import { BoostCurrentPositionInfo } from "./BoostCurrentPositionInfo";

export const BoostPositionInfo = () => {
  const { basicVaultReaderQuery, lendingPoolReaderQuery } =
    useBasicModalConfig();

  const { data: lendingPoolReaderData, isLoading: isBasicVaultLoading } =
    lendingPoolReaderQuery;

  const { isLoading: isBasicVaultReaderLoading } = basicVaultReaderQuery;

  const isLoading = isBasicVaultLoading || isBasicVaultReaderLoading;

  const loadingPlaceholder = ".....";

  const { currentLiquidityRate = 0 } = lendingPoolReaderData ?? {};
  const formattedAPY = (Number(currentLiquidityRate) * 100).toFixed(2);

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>APY</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : `${formattedAPY}%`}
        </InfoValue>
      </InfoContainer>
      <BoostCurrentPositionInfo />
    </Container>
  );
};
