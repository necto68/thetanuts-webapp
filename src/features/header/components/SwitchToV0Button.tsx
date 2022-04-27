import {
  BaseSwitchToV0Link,
  BaseSwitchToV0Button,
} from "./SwitchToV0Button.styles";

export const SwitchToV0Button = () => (
  <BaseSwitchToV0Link
    target="_blank"
    to="https://thetanuts.finance/basic/vaults"
  >
    <BaseSwitchToV0Button primaryColor="#283841">
      Thetanuts Basic
    </BaseSwitchToV0Button>
  </BaseSwitchToV0Link>
);
