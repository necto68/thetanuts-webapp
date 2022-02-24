import type { FC } from "react";
import { createElement } from "react";

import { IconContainer } from "../../shared/components";

import { SidebarItemContainer, SidebarLink } from "./SidebarItem.styles";

interface SidebarItemProps {
  to: string;
  navIcon: () => JSX.Element;
  linkTitle: string;
  active: boolean;
}

export const SidebarItem: FC<SidebarItemProps> = ({
  to,
  navIcon,
  linkTitle,
  active,
}) => {
  const color = active ? "#81e429" : "#fff";

  return (
    <SidebarItemContainer active={active}>
      <SidebarLink color={color} to={to}>
        <IconContainer height={29} width={29}>
          {createElement(navIcon)}
        </IconContainer>
        {linkTitle}
      </SidebarLink>
    </SidebarItemContainer>
  );
};
