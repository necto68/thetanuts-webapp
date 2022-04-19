import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 1.8rem;
  color: #061f3a;
`;

export const ContentContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const YieldContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

export const YieldValue = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 1.4rem;
  color: #000000;
`;

export const YieldTitle = styled(YieldValue)`
  font-weight: 400;
`;
