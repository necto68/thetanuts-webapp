import type { FC } from "react";

import {
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { useVaultStatus } from "../hooks/useVaultStatus";

import { StatusContainer, StatusIndicator } from "./DegenVaultStatus.styles";

interface VaultStatusProps {
  title?: string | null;
  expiry: number;
  isLoading: boolean;
  isSettled: boolean;
  isExpired: boolean;
  isAllowInteractions: boolean;
}

export const VaultStatus: FC<VaultStatusProps> = ({
  title = "Vault Status",
  isLoading,
  expiry,
  isSettled,
  isExpired,
  isAllowInteractions,
}) => {
  const { title: statusTitle, status } = useVaultStatus(
    expiry,
    isSettled,
    isExpired,
    isAllowInteractions
  );

  const loadingPlaceholder = ".....";

  return (
    <InfoContainer>
      {title ? <InfoTitle>{title}</InfoTitle> : null}
      <InfoValue isAlignRight>
        <StatusContainer>
          <StatusIndicator status={status} />
          {isLoading ? loadingPlaceholder : statusTitle}
        </StatusContainer>
      </InfoValue>
    </InfoContainer>
  );
};
