import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  min-width: 176px;

  ${screens.md} {
    min-width: 120px;
  }
`;

export const MetricTitleContainer = styled.div`
  padding: 0 10px;
`;

export const MetricValueContainer = styled(MetricTitleContainer)`
  background-color: #010c1a;
  border-radius: 10px;
  padding: 10px;
`;

export const MetricTitle = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;
`;

export const MetricValue = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 16px;
  color: #1fffab;
`;
