import { numberFormatter } from "../../shared/helpers";
import { useLongModalConfig } from "../../long-vault-modal/hooks";

import { InfoContainer, InfoTitle, InfoValue } from "./OrderInfo.styles";

export const BorrowFeeInfo = () => {
  const { longVaultReaderQuery } = useLongModalConfig();

  const { data, isLoading } = longVaultReaderQuery;

  const { borrowRate = 0 } = data ?? {};

  const formattedBorrowRate = numberFormatter.format(borrowRate);

  const loadingPlaceholder = ".....";

  return (
    <InfoContainer>
      <InfoTitle>Borrowing Fee (APR)</InfoTitle>
      <InfoValue>
        {isLoading ? loadingPlaceholder : `${formattedBorrowRate}%`}
      </InfoValue>
    </InfoContainer>
  );
};
