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
}

export const SidebarItem: FC<SidebarItemProps> = ({
  to,
  navIcon,
  linkTitle,
  active,
}) => {
  const color = active ? "#81e429" : "#fff";

  const { toggleIsShow } = useSidebarState();

  return (
    <SidebarItemContainer active={active}>
      <SidebarLink color={color} onClick={toggleIsShow} to={to}>
        <IconContainer height={29} width={29}>
          {createElement(navIcon)}
        </IconContainer>
        {linkTitle}
      </SidebarLink>
      <Underline active={active} />
    </SidebarItemContainer>
  );
};
