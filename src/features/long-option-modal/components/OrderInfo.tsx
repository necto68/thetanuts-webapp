import { useLongModalConfig } from "../../long-vault-modal/hooks";
import { numberFormatter } from "../../shared/helpers";

import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "./OrderInfo.styles";

export const OrderInfo = () => {
  const { longVaultReaderQuery, collateralAssetQuery } = useLongModalConfig();

  const { data: longVaultReaderData, isLoading: isLongVaultReaderLoading } =
    longVaultReaderQuery;
  const { data: collateralAssetData, isLoading: isCollateralAssetLoading } =
    collateralAssetQuery;

  const { borrowRate = 0 } = longVaultReaderData ?? {};
  const { availableLeverage = 1 } = collateralAssetData ?? {};

  const isLoading = isLongVaultReaderLoading || isCollateralAssetLoading;

  const formattedLeverage = numberFormatter.format(availableLeverage);
  const formattedBorrowRate = numberFormatter.format(borrowRate);

  const loadingPlaceholder = ".....";

  return (
    <Container>
      {/* TODO: return later */}
      {/* <InfoContainer>
        <InfoTitle>IV</InfoTitle>
        <InfoValue>XX.XX%</InfoValue>
      </InfoContainer> */}
      <InfoContainer>
        <InfoTitle>Leverage</InfoTitle>
        <InfoValue>
          {isLoading ? loadingPlaceholder : `${formattedLeverage}x`}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Spread Cost</InfoTitle>
        <InfoValue>X.XX%</InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Borrowing Fee (APR)</InfoTitle>
        <InfoValue>
          {isLoading ? loadingPlaceholder : `${formattedBorrowRate}%`}
        </InfoValue>
      </InfoContainer>
    </Container>
  );
};
