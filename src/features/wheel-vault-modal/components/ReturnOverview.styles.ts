import styled from "styled-components";

import { Container as BaseVaultInfoContainer } from "../../index-vault-modal/components/VaultInfo.styles";
import {
  Container as ExpanderContainer,
  Title as ExpanderTitle,
} from "../../index-vault-modal/components/Expander.styles";

export const Container = styled(ExpanderContainer)`
  gap: 12px;
  padding: 12px 12px 2px;
  border-radius: 16px;
`;

export const Title = ExpanderTitle;

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
