import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  min-width: 17.6rem;

  ${screens.md} {
    min-width: 12rem;
  }
`;

export const MetricTitleContainer = styled.div`
  padding: 0 1rem;
`;

export const MetricValueContainer = styled(MetricTitleContainer)`
  background-color: #010c1a;
  border-radius: 10px;
  padding: 1rem;
`;

export const MetricTitle = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 1.4rem;
  color: #ffffff;
`;

export const MetricValue = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 1.6rem;
  color: #1fffab;
`;
