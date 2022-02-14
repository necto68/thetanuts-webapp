import styled from "styled-components";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 5px;
`;

export const Title = styled.h3`
  font-family: Barlow;
  font-weight: 500;
  font-size: 20px;
`;

export const CloseButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CloseButton = styled(BaseButton)`
  border-radius: 50%;
  border-color: black;
  padding: 4px 18px;
  color: black;
  font-size: 18px;
  max-height: 5vh;
`;
