import type { FC } from "react";

import type { NavItem } from "../types";

import { Container, Title } from "./MainNavSection.styles";
import { SidebarItem } from "./SidebarItem";

interface MainNavSectionProps {
  title?: string;
  navItems: NavItem[];
}

export const MainNavSection: FC<MainNavSectionProps> = ({
  title,
  navItems,
}) => (
  <Container>
    {title ? <Title>{title}</Title> : null}
    {navItems.map((navItem) => (
      <SidebarItem
        iconColor={navItem.iconColor}
        key={navItem.linkTitle}
        linkTitle={navItem.linkTitle}
        navIcon={navItem.navIcon}
        target={navItem.target}
        to={navItem.to}
      />
    ))}
  </Container>
);
