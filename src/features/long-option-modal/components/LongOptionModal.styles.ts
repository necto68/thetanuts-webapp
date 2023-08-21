import styled from "styled-components";

import { ComponentContainer } from "../../long-option/components/LongOptionContent.styles";
import { screens } from "../../shared/constants";

export const Container = styled(ComponentContainer)`
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  width: 344px;

  ${screens.md} {
    width: 100%;
  }
`;

export const Separator = styled.div`
  display: flex;
  height: 1px;
  width: 100%;
  background: #323844;
`;
