import styled from "styled-components";

import { ExpandableContainer } from "./Expander.styles";

export const Wrapper = styled.div`
  ${ExpandableContainer} {
    overflow: hidden;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px 0;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const InfoSeparator = styled.div`
  height: 1px;
  width: 100%;
  margin: 4px 0;
  background-color: #c7c7c7;
`;

export const InfoTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InfoTitle = styled.span<{
  isUnderline?: boolean;
  isAlignRight?: boolean;
}>`
  font-family: Barlow;
  font-weight: 500;
  font-size: 12px;
  color: #ffffff;
  text-align: ${({ isAlignRight = false }) =>
    isAlignRight ? "right" : "left"};
  text-decoration: ${({ isUnderline = false }) =>
    isUnderline ? "underline" : "none"};
  cursor: ${({ isUnderline = false }) => (isUnderline ? "pointer" : "auto")};
`;

export const InfoValue = styled(InfoTitle)`
  white-space: nowrap;
`;

export const InfoTitleLight = styled(InfoTitle)`
  color: #ffffff;
`;

export const InfoValueLight = styled(InfoTitleLight)``;

export const InfoLink = styled.a<{
  isAlignRight?: boolean;
}>`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #061f3a;
  text-align: ${({ isAlignRight = false }) =>
    isAlignRight ? "right" : "left"};
`;
