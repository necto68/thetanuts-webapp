import styled from "styled-components";

import { ComponentContainer } from "../../long-option/components/LongOptionContent.styles";

export const Container = styled(ComponentContainer)`
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 344px;
`;

export const Separator = styled.div`
  display: flex;
  height: 1px;
  background: #323844;
`;
