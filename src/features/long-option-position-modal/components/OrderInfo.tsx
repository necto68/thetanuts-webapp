import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import {
  Container as InfoItemContainer,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../long-option-modal/components/OrderInfo.styles";
import { Separator } from "../../long-option-modal/components/LongOptionModal.styles";
import { VaultType } from "../../basic-vault/types";
import { getVaultStatus } from "../../degen-vault-modal/helpers/utils";
import { VaultStatus } from "../../basic-vault-modal/types";
import { getFormattedStrikePrices } from "../../basic-vault-modal/helpers";
import {
  PoolTypeInfo,
  LeverageInfo,
  BorrowFeeInfo,
} from "../../long-option-modal/components";

import { Container } from "./OrderInfo.styles";
import { ExpiryInfo } from "./ExpiryInfo";

export const OrderInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();

  const { data, isLoading } = basicVaultQuery;

  const {
    type = VaultType.CALL,
    strikePrices = [0],
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = data ?? {};

  const vaultStatus = getVaultStatus(isSettled, isExpired, isAllowInteractions);

  const strikePrice =
    vaultStatus === VaultStatus.ACTIVE_EPOCH
      ? getFormattedStrikePrices(type, strikePrices.slice(0, 2))
      : "-";

  const loadingPlaceholder = ".....";

  return (
    <Container>
      <InfoItemContainer>
        <InfoContainer>
          <InfoTitle>Strike Price</InfoTitle>
          <InfoValue>{isLoading ? loadingPlaceholder : strikePrice}</InfoValue>
        </InfoContainer>
        <ExpiryInfo />
      </InfoItemContainer>
      <Separator />
      <InfoItemContainer>
        <PoolTypeInfo />
        <LeverageInfo />
      </InfoItemContainer>
      <Separator />
      <InfoItemContainer>
        <InfoContainer>
          <InfoTitle>Fees</InfoTitle>
          <InfoValue>X.XX%</InfoValue>
        </InfoContainer>
        <BorrowFeeInfo />
      </InfoItemContainer>
    </Container>
  );
};
