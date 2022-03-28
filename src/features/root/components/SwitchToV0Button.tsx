import type { FC } from "react";

import {
  BaseSwitchToV0Link,
  BaseSwitchToV0Button,
  ButtonText,
} from "./SwitchToV0Button.styles";

interface SwitchToV0ButtonProps {
  secondaryColor?: string;
}

export const SwitchToV0Button: FC<SwitchToV0ButtonProps> = ({
  secondaryColor = "#000000",
}) => (
  <BaseSwitchToV0Link target="_blank" to="https://thetanuts.finance/vaults">
    <BaseSwitchToV0Button secondaryColor={secondaryColor}>
      <ButtonText>Switch to V0</ButtonText>
    </BaseSwitchToV0Button>
  </BaseSwitchToV0Link>
);
