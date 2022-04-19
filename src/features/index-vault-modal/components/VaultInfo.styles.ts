import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 1rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
`;

export const InfoValueContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const InfoValue = styled.span<{
  isUnderline?: boolean;
  isAlignRight?: boolean;
}>`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1.2rem;
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
  font-size: 1.2rem;
  color: #061f3a;
  text-align: ${({ isAlignRight = false }) =>
    isAlignRight ? "right" : "left"};
`;
