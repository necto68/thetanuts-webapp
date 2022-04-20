import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 10px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
`;

export const InfoValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const InfoValue = styled.span<{
  isUnderline?: boolean;
  isAlignRight?: boolean;
}>`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #061f3a;
  text-align: ${({ isAlignRight = false }) =>
    isAlignRight ? "right" : "left"};
  text-decoration: ${({ isUnderline = false }) =>
    isUnderline ? "underline" : "none"};
  cursor: ${({ isUnderline = false }) => (isUnderline ? "pointer" : "auto")};
`;

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
