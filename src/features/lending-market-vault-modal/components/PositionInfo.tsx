import { numberFormatter } from "../../shared/helpers";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { useLendingMarketModalConfig } from "../hooks/useLendingMarketModalConfig";

export const PositionInfo = () => {
  const { lendingMarketVaultReaderQuery } = useLendingMarketModalConfig();

  const { data, isLoading } = lendingMarketVaultReaderQuery;
  const { currentPosition = null, pendingBorrow = null } = data ?? {};

  const loadingPlaceholder = ".....";

  // TODO: use real symbol instead of !!!TOKEN
  const [formattedCurrentPosition, formattedPendingBorrow] = [
    currentPosition,
    pendingBorrow,
  ].map((value) =>
    value ? `${numberFormatter.format(value.toNumber())} !!!TOKEN` : "N/A"
  );

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>Active Position</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedCurrentPosition}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Pending Borrow</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedPendingBorrow}
        </InfoValue>
      </InfoContainer>
    </Container>
  );
};
