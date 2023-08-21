import { useLongOptionModalConfig } from "../hooks";
import { numberFormatter } from "../../shared/helpers";

import { InfoContainer, InfoTitle, InfoValue } from "./OrderInfo.styles";

export const LeverageInfo = () => {
  const { longOptionReaderQuery } = useLongOptionModalConfig();
  const { data, isLoading } = longOptionReaderQuery;

  const { swapLeverage = null } = data ?? {};

  const formattedLeverage =
    swapLeverage === null ? "N/A" : `${numberFormatter.format(swapLeverage)}x`;

  const loadingPlaceholder = ".....";

  return (
    <InfoContainer>
      <InfoTitle>Leverage</InfoTitle>
      <InfoValue>
        {isLoading ? loadingPlaceholder : formattedLeverage}
      </InfoValue>
    </InfoContainer>
  );
};
