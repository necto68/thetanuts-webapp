import styled from "styled-components";
import type { AnchorHTMLAttributes } from "react";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  background-color: rgba(1, 12, 26, 0.7);
  border-radius: 10px;

  padding: 3.5rem;

  ${screens.md} {
    padding: 1.5rem;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 10rem;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const BasketIconContainer = styled.div`
  display: flex;
  align-items: center;

  ${screens.md} {
    display: none;
  }
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 2.4rem;
  color: #e5e5e5;
`;

export const Description = styled.p`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1.4rem;
  color: #e5e5e5;
  margin: 0;
`;

export const DescriptionLink = styled(Description).attrs(() => ({
  as: "a",
  target: "_blank",
}))<AnchorHTMLAttributes<HTMLAnchorElement>>`
  &:hover {
    color: #1fffab;
  }
`;

export const ExpandDescriptionLink = styled(DescriptionLink)`
  color: #0ddbe7;

  &:hover {
    color: #e5e5e5;
  }
`;
