import type { FC } from "react";
import { createElement } from "react";
import { useLocation } from "react-router-dom";

import { IconContainer } from "../../shared/components";
import { useSidebarState } from "../hooks";
import type { NavItem } from "../types";

import {
  SidebarItemContainer,
  SidebarLink,
  Underline,
} from "./SidebarItem.styles";

export const SidebarItem: FC<NavItem> = ({
  to,
  navIcon,
  linkTitle,
  target = "_self",
  iconColor = "#1fffab",
}) => {
  const { toggleIsShow } = useSidebarState();
  const { pathname } = useLocation();

  const isActive = pathname.includes(to);

  return (
    <SidebarItemContainer active={isActive} iconColor={iconColor}>
      <SidebarLink
        active={isActive}
        onClick={toggleIsShow}
        target={target}
        to={to}
      >
        <IconContainer height={16} width={16}>
          {createElement(navIcon)}
        </IconContainer>
        {linkTitle}
      </SidebarLink>
      <Underline active={isActive} iconColor={iconColor} />
    </SidebarItemContainer>
  );
};
