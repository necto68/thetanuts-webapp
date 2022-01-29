import styled from "styled-components";

import { BaseButton } from "../../shared/components";

export const ChainsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  border-width: 2px;
  border-style: solid;
  border-color: #ffffff;
  background-color: #010c1a;
`;

export const ChainOptionButton = styled(BaseButton)`
  border: none;
  box-shadow: none !important;
  border-radius: 0;
  border-bottom: 1px solid #9c9c9c;
`;
