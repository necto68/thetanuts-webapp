import styled from "styled-components";

import { ComponentContainer } from "../../long-option/components/LongOptionContent.styles";

export const Container = styled(ComponentContainer)`
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 344px;
  border-radius: 10px;
`;

export const Separator = styled.div`
  display: flex;
  height: 1px;
  width: 100%;
  background: #323844;
`;
