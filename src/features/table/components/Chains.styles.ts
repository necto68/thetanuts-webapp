import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 2px;
`;

export const ChainLogoContainer = styled.div<{ isHighlighted?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  border-width: ${({ isHighlighted }) => (isHighlighted ? "1px" : 0)};
  border-style: solid;
  border-color: #1fffab;
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
