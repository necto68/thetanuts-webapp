import styled from "styled-components";
import type { AnchorHTMLAttributes } from "react";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PriceTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #e5e5e5;
`;

export const PriceImpactTitle = styled(PriceTitle)`
  color: #eb5853;
`;

export const WarningTitle = styled(PriceTitle)`
  font-size: 11px;
  color: #eb5853;
`;

export const WarningLink = styled(WarningTitle).attrs(() => ({
  as: "a",
  target: "_blank",
}))<AnchorHTMLAttributes<HTMLAnchorElement>>`
  color: #e5e5e5;
`;
