import { useLongModalConfig } from "../../long-vault-modal/hooks";
import { numberFormatter } from "../../shared/helpers";

import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "./OrderInfo.styles";

export const OrderInfo = () => {
  const { longVaultReaderQuery } = useLongModalConfig();
  const { data, isLoading } = longVaultReaderQuery;
  const { borrowRate = 0 } = data ?? {};

  const formattedBorrowRate = numberFormatter.format(borrowRate);

  const loadingPlaceholder = ".....";

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>IV</InfoTitle>
        <InfoValue>XX.XX%</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Leverage</InfoTitle>
        <InfoValue>10x</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Spread Cost</InfoTitle>
        <InfoValue>X.XX%</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Borrowing Fee</InfoTitle>
        <InfoValue>
          {isLoading ? loadingPlaceholder : `${formattedBorrowRate}%`}
        </InfoValue>
      </InfoContainer>
    </Container>
  );
};
