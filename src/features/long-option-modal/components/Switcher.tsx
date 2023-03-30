import type { FC } from "react";

import { Container } from "../../basic-vault-modal/components/Switcher.styles";

import { TabButton } from "./TabButton";

type TabType = "call" | "put";

interface SwitcherProps {
  currentTabType: TabType;
  onTabButtonClick: (tabType: TabType) => void;
}

export const Switcher: FC<SwitcherProps> = ({
  currentTabType,
  onTabButtonClick,
}) => (
  <Container>
    <TabButton
      currentTabType={currentTabType}
      onClick={onTabButtonClick}
      tabType="call"
    >
      Call
    </TabButton>
    <TabButton
      currentTabType={currentTabType}
      onClick={onTabButtonClick}
      tabType="put"
    >
      Put
    </TabButton>
  </Container>
);
