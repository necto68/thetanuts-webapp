export interface NavItem {
  to: string;
  navIcon: () => JSX.Element;
  linkTitle: string;
  target?: HTMLLinkElement["target"];
  iconColor?: string;
}
