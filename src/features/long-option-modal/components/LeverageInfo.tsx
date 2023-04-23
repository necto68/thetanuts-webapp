import { useLongOptionModalConfig } from "../hooks";
import { numberFormatter } from "../../shared/helpers";

import { InfoContainer, InfoTitle, InfoValue } from "./OrderInfo.styles";

export const LeverageInfo = () => {
  const { longOptionReaderQuery } = useLongOptionModalConfig();
  const { data, isLoading } = longOptionReaderQuery;

  const { swapLeverage = null } = data ?? {};

  const formattedLeverage =
    swapLeverage === null ? "0" : numberFormatter.format(swapLeverage);
  const leverageValue = swapLeverage === null ? "N/A" : `${formattedLeverage}x`;

  const loadingPlaceholder = ".....";

  return (
    <InfoContainer>
      <InfoTitle>Leverage</InfoTitle>
      <InfoValue>{isLoading ? loadingPlaceholder : leverageValue}</InfoValue>
    </InfoContainer>
  );
};
