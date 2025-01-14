import styled from "styled-components";
import type { AnchorHTMLAttributes } from "react";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  border-radius: 10px;

  padding: 25px;

  ${screens.md} {
    padding: 15px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 100px;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  font-size: 24px;
  color: #e5e5e5;
`;

export const Description = styled.p`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #e5e5e5;
  margin: 0;
  line-height: 20px;
`;

export const ItalicDescription = styled(Description)`
  font-style: italic;
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
