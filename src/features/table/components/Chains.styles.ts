import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
`;

export const ChainLogoContainer = styled.div<{
  isHighlighted?: boolean;
  isClickable?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  outline: ${({ isHighlighted }) => (isHighlighted ? "1px solid #1fffab" : 0)};
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
`;

export const HiddenChainsContainer = styled(ChainLogoContainer)`
  width: 28px;
  height: 28px;
  padding: 0;
  background-color: #4857b9;
`;

export const HiddenChainsTitle = styled.div`
  font-family: Roboto;
  font-weight: 600;
  font-size: 14px;
  color: #ffffff;
`;
