import type { FC } from "react";

import { Container, Button, Underline } from "./TabButton.styles";

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: FC<TabButtonProps> = ({
  isActive,
  onClick,
  children,
}) => (
  <Container>
    <Button onClick={onClick} primaryColor={isActive ? "#81e429" : "#ffffff"}>
      {children}
    </Button>
    <Underline isActive={isActive} />
  </Container>
);
