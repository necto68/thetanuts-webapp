import styled from "styled-components";
import type { AnchorHTMLAttributes } from "react";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const WarningTitle = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 1.1rem;
  color: #eb5853;
`;

export const WarningLink = styled(WarningTitle).attrs(() => ({
  as: "a",
  target: "_blank",
}))<AnchorHTMLAttributes<HTMLAnchorElement>>`
  color: #e5e5e5;
`;
