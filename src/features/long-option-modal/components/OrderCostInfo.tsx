import { useLongModalConfig } from "../../long-vault-modal/hooks";
import { numberFormatter } from "../../shared/helpers";

import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "./OrderInfo.styles";

export const OrderCostInfo = () => {
  const { longVaultReaderQuery } = useLongModalConfig();
  const { data, isLoading } = longVaultReaderQuery;
  const { borrowRate = 0 } = data ?? {};

  const formattedBorrowRate = numberFormatter.format(borrowRate);

  const loadingPlaceholder = ".....";

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>Borrowing Fee</InfoTitle>
        <InfoValue>
          {isLoading ? loadingPlaceholder : `${formattedBorrowRate}%`}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Execution Cost</InfoTitle>
        <InfoValue>0</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Total Cost</InfoTitle>
        <InfoValue>XX.XX MATIC</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Your Balance</InfoTitle>
        <InfoValue>0 MATIC</InfoValue>
      </InfoContainer>
    </Container>
  );
};
