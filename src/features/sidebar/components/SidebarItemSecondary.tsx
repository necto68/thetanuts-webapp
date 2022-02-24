import type { FC } from "react";

import {
  SidebarItemSecondaryContainer,
  SidebarLink,
} from "./SidebarItemSecondary.styles";

interface SidebarItemProps {
  to: string;
  linkTitle: string;
  active: boolean;
}

export const SidebarItemSecondary: FC<SidebarItemProps> = ({
  to,
  linkTitle,
  active,
}) => {
  const color = active ? "#81e429" : "#fff";

  return (
    <SidebarItemSecondaryContainer>
      <SidebarLink color={color} target="_blank" to={to}>
        {linkTitle}
      </SidebarLink>
    </SidebarItemSecondaryContainer>
  );
};
