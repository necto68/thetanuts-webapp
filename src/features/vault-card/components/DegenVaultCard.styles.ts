import styled from "styled-components";

import {
  DataContainer as VaultCardDataContainer,
  Title as VaultCardTitle,
  APYTitle as VaultCardAPYTitle,
  SubTitle as VaultCardSubTitle,
} from "./VaultCard.styles";

export const DataContainer = styled(VaultCardDataContainer)`
  padding: 8px 2px 5px;
`;

export const Title = styled(VaultCardTitle)`
  color: #ffffff;
`;

export const DataContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const DataItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const APYContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

export const APYTitle = styled(VaultCardSubTitle)`
  font-family: Barlow;
  font-weight: 600;
`;

export const APYValue = styled(VaultCardAPYTitle)`
  font-family: Barlow;
  font-weight: 600;
`;

export const SymbolContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SubTitle = styled(VaultCardSubTitle)`
  text-transform: uppercase;
`;