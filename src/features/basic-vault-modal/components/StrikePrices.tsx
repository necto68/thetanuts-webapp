import type { FC } from "react";

import { getFormattedStrikePrices } from "../helpers";
import {
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { useBasicModalConfig } from "../hooks";
import { VaultType } from "../../basic-vault/types";
import { BasicVaultType } from "../../basic/types";
import { getVaultStatus } from "../../degen-vault-modal/helpers/utils";
import { VaultStatus } from "../types/VaultStatus";

interface StrikePricesProps {
  loadingPlaceholder?: string;
}

export const StrikePrices: FC<StrikePricesProps> = ({
  loadingPlaceholder = "......",
}) => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data, isLoading } = basicVaultQuery;
  const {
    type = VaultType.CALL,
    basicVaultType = BasicVaultType.BASIC,
    strikePrices = [0],
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = data ?? {};

  const vaultStatus = getVaultStatus(isSettled, isExpired, isAllowInteractions);

  const soldStrikePrices =
    vaultStatus === VaultStatus.ACTIVE_EPOCH
      ? getFormattedStrikePrices(type, strikePrices.slice(0, 2))
      : "-";

  const boughtStrikePrices =
    vaultStatus === VaultStatus.ACTIVE_EPOCH
      ? getFormattedStrikePrices(type, strikePrices.slice(2, 4))
      : "-";

  return basicVaultType === BasicVaultType.DEGEN ? (
    <>
      <InfoContainer>
        <InfoTitle>Short Strike Price</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : soldStrikePrices}
        </InfoValue>
      </InfoContainer>
      <InfoContainer>
        <InfoTitle>Long Strike Price</InfoTitle>
        <InfoValue isAlignRight>
          {isLoading ? loadingPlaceholder : boughtStrikePrices}
        </InfoValue>
      </InfoContainer>
    </>
  ) : (
    <InfoContainer>
      <InfoTitle>Strike Price</InfoTitle>
      <InfoValue isAlignRight>
        {isLoading ? loadingPlaceholder : soldStrikePrices}
      </InfoValue>
    </InfoContainer>
  );
};
