import type { NavLinkProps as ReactRouterNavLinkProps } from "react-router-dom";
import { NavLink as ReactRouterNavLink } from "react-router-dom";
import React from "react";

type NavLinkProps = ReactRouterNavLinkProps;

const Link: React.FC<NavLinkProps> = ({ children, to, ...props }) => {
  const internal = typeof to === "string" ? /^\/(?!\/)/u.test(to) : true;
  const { className } = props;

  if (internal || typeof to !== "string") {
    return (
      <ReactRouterNavLink to={to} {...props}>
        {children}
      </ReactRouterNavLink>
    );
  }

  return (
    <a className={typeof className === "string" ? className : ""} href={to}>
      {children}
    </a>
  );
};

export default Link;
