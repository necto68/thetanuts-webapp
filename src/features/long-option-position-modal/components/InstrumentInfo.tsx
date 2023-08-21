import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { VaultType } from "../../basic-vault/types";
import {
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../long-option-modal/components/OrderInfo.styles";
import { getLongOptionTokenTitle } from "../../table/helpers";

export const InstrumentInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();

  const { data: basicVaultData, isLoading } = basicVaultQuery;

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    expiry = 0,
    strikePrices = [0],
  } = basicVaultData ?? {};

  const optionTitle = getLongOptionTokenTitle(
    type,
    assetSymbol,
    expiry,
    strikePrices
  );

  const loadingPlaceholder = ".....";

  return (
    <InfoContainer>
      <InfoTitle>Instrument</InfoTitle>
      <InfoValue>{isLoading ? loadingPlaceholder : optionTitle}</InfoValue>
    </InfoContainer>
  );
};
