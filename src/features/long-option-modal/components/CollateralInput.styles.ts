import styled from "styled-components";

import { SwapInput } from "../../index-vault-modal/components/SwapInputCard.styles";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  color: #a6b0c7;
`;

export const SubTitle = styled(Title)`
  font-size: 11px;
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 8px 16px;
  background: #323844;
  border-radius: 4px;
`;

export const Input = styled(SwapInput)`
  font-size: 14px;
`;

export const InputValue = styled.div`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #e5e5e5;
`;
