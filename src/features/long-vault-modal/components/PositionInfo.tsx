import { numberFormatter } from "../../shared/helpers";
import {
  Container,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { useLongModalConfig } from "../hooks/useLongModalConfig";
import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import { getLongVaultContractsTitle } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";
import { TabType } from "../../basic-vault-modal/types";
import { VaultStatusInfo } from "../../basic-vault-modal/components";

export const PositionInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { tabType } = useBasicModalState();
  const { longVaultReaderQuery } = useLongModalConfig();

  const { data, isLoading: isBasicVaultLoading } = basicVaultQuery;
  const {
    type = VaultType.CALL,
    assetSymbol = "",
    collateralSymbol = "",
  } = data ?? {};

  const { data: longVaultReaderData, isLoading: isLongVaultReaderLoading } =
    longVaultReaderQuery;
  const { currentContractsPosition = null, borrowContractsPending = null } =
    longVaultReaderData ?? {};

  const isLoading = isBasicVaultLoading || isLongVaultReaderLoading;

  const contractsTitle = getLongVaultContractsTitle(
    type,
    assetSymbol,
    collateralSymbol
  );

  const loadingPlaceholder = ".....";

  const [formattedCurrentContractsPosition, formattedBorrowContractsPending] = [
    currentContractsPosition,
    borrowContractsPending,
  ].map((value) =>
    value
      ? `${numberFormatter.format(value.toNumber())} ${contractsTitle}`
      : "N/A"
  );

  return (
    <Container>
      <VaultStatusInfo />
      <InfoContainer>
        <InfoTitle>Active Position</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : formattedCurrentContractsPosition}
        </InfoValue>
      </InfoContainer>
      {tabType === TabType.deposit ? (
        <InfoContainer>
          <InfoTitle>Pending Long Contracts</InfoTitle>
          <InfoValue isAlignRight>
            {isLoading ? loadingPlaceholder : formattedBorrowContractsPending}
          </InfoValue>
        </InfoContainer>
      ) : null}
    </Container>
  );
};
