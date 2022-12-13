import type { FC } from "react";
import { createElement } from "react";

import { IconContainer } from "../../shared/components";
import { useSidebarState } from "../hooks";

import {
  SidebarItemContainer,
  SidebarLink,
  Underline,
} from "./SidebarItem.styles";

interface SidebarItemProps {
  to: string;
  navIcon: () => JSX.Element;
  linkTitle: string;
  active: boolean;
  target?: HTMLLinkElement["target"];
  iconColor?: string;
}

export const SidebarItem: FC<SidebarItemProps> = ({
  to,
  navIcon,
  linkTitle,
  active,
  target = "_self",
  iconColor = "#1fffab",
}) => {
  const { toggleIsShow } = useSidebarState();

  return (
    <SidebarItemContainer active={active} iconColor={iconColor}>
      <SidebarLink
        active={active}
        onClick={toggleIsShow}
        target={target}
        to={to}
      >
        <IconContainer height={16} width={16}>
          {createElement(navIcon)}
        </IconContainer>
        {linkTitle}
      </SidebarLink>
      <Underline active={active} iconColor={iconColor} />
    </SidebarItemContainer>
  );
};
