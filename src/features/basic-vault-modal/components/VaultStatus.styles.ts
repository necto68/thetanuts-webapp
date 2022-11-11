import styled from "styled-components";

import { VaultStatus } from "../types/VaultStatus";

interface StatusIndicatorProps {
  status: VaultStatus;
}

export const StatusIndicator = styled.div<StatusIndicatorProps>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${({ status }) => {
    switch (status) {
      case VaultStatus.ACTIVE_EPOCH:
        return "#00FF29";
      case VaultStatus.PAUSE:
        return "#EB5353";
      default:
        return "#FFE600";
    }
  }};
`;

export const StatusContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;
