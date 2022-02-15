import styled from "styled-components";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 20px;
`;

export const CloseButton = styled(BaseButton).attrs(() => ({
  primaryColor: "#5D5D5D",
}))`
  width: 40px;
  height: 40px;
  padding: 0;
  border-radius: 50%;
`;
