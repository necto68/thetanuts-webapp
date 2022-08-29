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
}

export const SidebarItem: FC<SidebarItemProps> = ({
  to,
  navIcon,
  linkTitle,
  active,
  target = "_self",
}) => {
  const fontWeight = active ? 600 : 400;
  const color = active ? "#1fffab" : "#fff";

  const { toggleIsShow } = useSidebarState();

  return (
    <SidebarItemContainer active={active}>
      <SidebarLink
        color={color}
        fontWeight={fontWeight}
        onClick={toggleIsShow}
        target={target}
        to={to}
      >
        <IconContainer height={29} width={29}>
          {createElement(navIcon)}
        </IconContainer>
        {linkTitle}
      </SidebarLink>
      <Underline active={active} />
    </SidebarItemContainer>
  );
};
