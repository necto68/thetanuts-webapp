import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 15px;
`;

export const InfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PriceInfoContainer = styled(InfoContainer)`
  justify-content: flex-end;
`;

export const InfoValue = styled.span<{ isUnderline?: boolean }>`
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  text-decoration: ${({ isUnderline = false }) =>
    isUnderline ? "underline" : "none"};
`;
