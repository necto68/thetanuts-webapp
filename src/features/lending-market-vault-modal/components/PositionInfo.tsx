import { numberFormatter } from "../../shared/helpers";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { useLendingMarketModalConfig } from "../hooks/useLendingMarketModalConfig";
import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import { getLongVaultContractsTitle } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";
import { TabType } from "../../basic-vault-modal/types";

export const PositionInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { tabType } = useBasicModalState();
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

  const contractsTitle = getLongVaultContractsTitle(
    type,
    assetSymbol,
    collateralSymbol
  );

  const loadingPlaceholder = ".....";

  const [formattedCurrentPosition, formattedBorrowPending] = [
    currentPosition,
    borrowPending,
  ].map((value) =>
    value
      ? `${numberFormatter.format(value.toNumber())} ${contractsTitle}`
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
      {tabType === TabType.deposit ? (
        <InfoContainer>
          <InfoTitle>Pending Long Contracts</InfoTitle>
          <InfoValue isAlignRight>
            {isLoading ? loadingPlaceholder : formattedBorrowPending}
          </InfoValue>
        </InfoContainer>
      ) : null}
    </Container>
  );
};
