import { useLongOptionModalConfig } from "../../long-option-modal/hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../long-option-modal/components/OrderInfo.styles";
import { assetFormatter } from "../../shared/helpers";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";

export const ReceiveInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { longOptionClosePositionReaderQuery } = useLongOptionModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const {
    data: longOptionClosePosition,
    isLoading: isLongOptionClosePositionReaderLoading,
  } = longOptionClosePositionReaderQuery;

  const { collateralSymbol = "" } = basicVaultData ?? {};
  const { minToReceiveCollateralValue = null } = longOptionClosePosition ?? {};

  const formattedReceiveValue = minToReceiveCollateralValue
    ? `${assetFormatter.format(
        minToReceiveCollateralValue.toNumber()
      )} ${collateralSymbol}`
    : "N/A";

  const isLoading =
    isBasicVaultLoading || isLongOptionClosePositionReaderLoading;

  const loadingPlaceholder = ".....";

  return (
    <InfoContainer>
      <InfoTitle>Receive</InfoTitle>
      <InfoValue>
        {isLoading ? loadingPlaceholder : formattedReceiveValue}
      </InfoValue>
    </InfoContainer>
  );
};
