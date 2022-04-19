import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.2rem;
`;

export const ChainLogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
`;

export const HiddenChainsContainer = styled(ChainLogoContainer)`
  width: 2.8rem;
  height: 2.8rem;
  padding: 0;
  background-color: #4857b9;
`;

export const HiddenChainsTitle = styled.div`
  font-family: Roboto;
  font-weight: 600;
  font-size: 1.4rem;
  color: #ffffff;
`;
