import { numberFormatter } from "../../shared/helpers";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { useLendingMarketModalConfig } from "../hooks/useLendingMarketModalConfig";
import { VaultModalType } from "../../root/types";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { getVaultTitle } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";

export const PositionInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { lendingMarketVaultReaderQuery } = useLendingMarketModalConfig();

  const { data, isLoading: isBasicVaultLoading } = basicVaultQuery;
  const {
    type = VaultType.CALL,
    assetSymbol = "",
    collateralSymbol = "",
  } = data ?? {};

  const {
    data: lendingMarketVaultReaderData,
    isLoading: isLendingMarketVaultReaderLoading,
  } = lendingMarketVaultReaderQuery;
  const { currentPosition = null, borrowPending = null } =
    lendingMarketVaultReaderData ?? {};

  const isLoading = isBasicVaultLoading || isLendingMarketVaultReaderLoading;

  const vaultTokenSymbol = getVaultTitle(
    VaultModalType.lendingMarket,
    type,
    assetSymbol,
    collateralSymbol,
    true
  );

  const loadingPlaceholder = ".....";

  const [formattedCurrentPosition, formattedBorrowPending] = [
    currentPosition,
    borrowPending,
  ].map((value) =>
    value
      ? `${numberFormatter.format(value.toNumber())} ${vaultTokenSymbol}`
      : "N/A"
  );

  return (
    <Container>
      <InfoContainer>
        <InfoTitle>Active Position</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedCurrentPosition}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Pending Borrow</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedBorrowPending}
        </InfoValue>
      </InfoContainer>
    </Container>
  );
};
