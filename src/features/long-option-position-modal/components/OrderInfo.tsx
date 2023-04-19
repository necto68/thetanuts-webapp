import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { useLongModalConfig } from "../../long-vault-modal/hooks";
import { numberFormatter } from "../../shared/helpers";
import {
  Container as InfoItemContainer,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../long-option-modal/components/OrderInfo.styles";
import { Separator } from "../../long-option-modal/components/LongOptionModal.styles";
import { getVaultTypeStrategy } from "../../index-vault/helpers";
import { VaultType } from "../../basic-vault/types";
import { getVaultStatus } from "../../degen-vault-modal/helpers/utils";
import { VaultStatus } from "../../basic-vault-modal/types";
import { getFormattedStrikePrices } from "../../basic-vault-modal/helpers";

import { Container } from "./OrderInfo.styles";

// eslint-disable-next-line complexity
export const OrderInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { longVaultReaderQuery, collateralAssetQuery } = useLongModalConfig();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;
  const { data: longVaultReaderData, isLoading: isLongVaultReaderLoading } =
    longVaultReaderQuery;
  const { data: collateralAssetData, isLoading: isCollateralAssetLoading } =
    collateralAssetQuery;

  const {
    type = VaultType.CALL,
    assetSymbol = "",
    strikePrices = [0],
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = basicVaultData ?? {};
  const { borrowRate = 0 } = longVaultReaderData ?? {};
  const { availableLeverage = 1 } = collateralAssetData ?? {};

  const isLoading =
    isBasicVaultLoading || isLongVaultReaderLoading || isCollateralAssetLoading;

  const vaultStatus = getVaultStatus(isSettled, isExpired, isAllowInteractions);
  const vaultTypeStrategy = getVaultTypeStrategy(type);

  const strikePrice =
    vaultStatus === VaultStatus.ACTIVE_EPOCH
      ? getFormattedStrikePrices(type, strikePrices.slice(0, 2))
      : "-";

  const formattedLeverage = numberFormatter.format(availableLeverage);
  const formattedBorrowRate = numberFormatter.format(borrowRate);

  const loadingPlaceholder = ".....";

  return (
    <Container>
      <InfoItemContainer>
        <InfoContainer>
          <InfoTitle>Strike Price</InfoTitle>
          <InfoValue>{isLoading ? loadingPlaceholder : strikePrice}</InfoValue>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>Expiration</InfoTitle>
          <InfoValue>{isLoading ? loadingPlaceholder : "17MAR23"}</InfoValue>
        </InfoContainer>
      </InfoItemContainer>
      <Separator />
      <InfoItemContainer>
        <InfoContainer>
          <InfoTitle>Pool Type</InfoTitle>
          <InfoValue>
            {isLoading
              ? loadingPlaceholder
              : `10D ${assetSymbol} ${vaultTypeStrategy}`}
          </InfoValue>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>Leverage</InfoTitle>
          <InfoValue>
            {isLoading ? loadingPlaceholder : `${formattedLeverage}x`}
          </InfoValue>
        </InfoContainer>
      </InfoItemContainer>
      <Separator />
      <InfoItemContainer>
        <InfoContainer>
          <InfoTitle>Fees</InfoTitle>
          <InfoValue>X.XX%</InfoValue>
        </InfoContainer>
        <InfoContainer>
          <InfoTitle>Borrowing Fee (APR)</InfoTitle>
          <InfoValue>
            {isLoading ? loadingPlaceholder : `${formattedBorrowRate}%`}
          </InfoValue>
        </InfoContainer>
      </InfoItemContainer>
    </Container>
  );
};
