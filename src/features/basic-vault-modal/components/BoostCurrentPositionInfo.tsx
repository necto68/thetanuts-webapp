/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useBasicModalConfig, useBasicModalState } from "../hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoTitleContainer,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { assetFormatter } from "../../shared/helpers";

export const BoostCurrentPositionInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();

  const { activePositionData } = useBasicModalState();

  const { data: basicVaultData, isLoading: isBasicVaultLoading } =
    basicVaultQuery;

  const isLoading = isBasicVaultLoading;

  const boostBalance = activePositionData?.balance?.toNumber();

  const boostSymbol = basicVaultData?.id;

  const loadingPlaceholder = ".....";

  const formattedCurrentPosition = boostBalance
    ? `${assetFormatter.format(boostBalance)} ${boostSymbol}`
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
