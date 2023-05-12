import {
  useBasicModalConfig,
  useBasicModalState,
} from "../../basic-vault-modal/hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { assetFormatter } from "../../shared/helpers";
import { getLendingPoolTokenTitle } from "../../table/helpers";
import { VaultType } from "../../basic-vault/types";

export const BoostCurrentPositionInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();

  const { activePositionData } = useBasicModalState();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;

  const isLoading = isBasicVaultLoading;

  const boostBalance = activePositionData?.balance?.toNumber();

  const {
    collateralSymbol = "",
    type = VaultType.CALL,
    assetSymbol = "",
  } = basicVaultData ?? {};

  const loadingPlaceholder = ".....";

  const vaultTitle = getLendingPoolTokenTitle(
    type,
    assetSymbol,
    collateralSymbol
  );

  const formattedCurrentPosition = boostBalance
    ? `${assetFormatter.format(boostBalance)} ${vaultTitle}`
    : "N/A";

  return (
    <InfoContainer>
      <InfoTitleContainer>
        <InfoTitle>Active Position</InfoTitle>
      </InfoTitleContainer>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : formattedCurrentPosition}
      </InfoValue>
    </InfoContainer>
  );
};
