import styled from "styled-components";

export { InfoContainer } from "../../index-vault-modal/components/VaultInfo.styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const InfoTitle = styled.span`
  font-family: Roboto;
  font-size: 12px;
  color: #a6b0c7;
`;

export const InfoValue = styled(InfoTitle)`
  font-weight: 500;
  color: #ffffff;
`;
