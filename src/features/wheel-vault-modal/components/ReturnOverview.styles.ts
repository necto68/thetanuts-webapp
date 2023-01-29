import styled from "styled-components";

import { Container as BaseVaultInfoContainer } from "../../index-vault-modal/components/VaultInfo.styles";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const VaultInfoContainer = styled(BaseVaultInfoContainer)`
  gap: 8px;
`;

export const APYValue = styled.span`
  color: #12cc86;
`;
