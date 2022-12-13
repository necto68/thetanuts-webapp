import type { FC } from "react";

import { useVaultStatus } from "../hooks";

import {
  StatusContainer,
  StatusIndicator,
  StatusText,
} from "./VaultStatus.styles";

interface VaultStatusProps {
  expiry: number;
  isLoading: boolean;
  isSettled: boolean;
  isExpired: boolean;
  isAllowInteractions: boolean;
}

export const VaultStatus: FC<VaultStatusProps> = ({
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
    <StatusContainer>
      <StatusIndicator status={status} />
      <StatusText>{isLoading ? loadingPlaceholder : statusTitle}</StatusText>
    </StatusContainer>
  );
};
