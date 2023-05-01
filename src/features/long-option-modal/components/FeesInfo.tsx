import { numberFormatter } from "../../shared/helpers";

import { InfoContainer, InfoTitle, InfoValue } from "./OrderInfo.styles";

export const FeesInfo = () => {
  const formattedBorrowRate = numberFormatter.format(0);

  return (
    <InfoContainer>
      <InfoTitle>Fees</InfoTitle>
      <InfoValue>{`${formattedBorrowRate}%`}</InfoValue>
    </InfoContainer>
  );
};
