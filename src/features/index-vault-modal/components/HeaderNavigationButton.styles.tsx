import styled from "styled-components";

import { CircleButton, CircleButtonIconType } from "../../shared/components";
import { screens } from "../../shared/constants";

export const HeaderNavigationCircleButton = styled(CircleButton)<{
  iconType?: CircleButtonIconType;
}>`
  display: ${({ iconType = CircleButtonIconType.cross }) =>
    iconType === CircleButtonIconType.cross ? "none" : "flex"};
  ${screens.md} {
    display: flex;
  }
`;
