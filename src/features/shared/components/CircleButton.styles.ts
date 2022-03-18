import styled from "styled-components";

import type { BaseButtonProps } from "./BaseButton";
import { BaseButton } from "./BaseButton";

export const BaseCircleButton = styled(BaseButton).attrs<BaseButtonProps>(
  ({ primaryColor }) => ({
    primaryColor,
  })
)<BaseButtonProps>`
  padding: 10px;
  border-radius: 50%;
`;

export const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
