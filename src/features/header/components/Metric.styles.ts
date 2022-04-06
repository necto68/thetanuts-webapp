import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  min-width: 260px;

  @media (max-width: ${sizes.md}px) {
    min-width: 120px;
  }
`;

export const MetricTitleContainer = styled.div`
  padding: 0 15px;

  @media (max-width: ${sizes.md}px) {
    padding: 0 10px;
  }
`;

export const MetricValueContainer = styled(MetricTitleContainer)`
  background-color: #010c1a;

  border-radius: 10px;

  padding: 7px 15px;

  @media (max-width: ${sizes.md}px) {
    padding: 10px;
  }
`;

export const MetricTitle = styled.span`
  font-family: Barlow;
  font-weight: 500;
  color: #ffffff;

  font-size: 18px;

  @media (max-width: ${sizes.md}px) {
    font-size: 12px;
  }
`;

export const MetricValue = styled.span`
  font-family: Barlow;
  font-weight: 700;
  color: #1fffab;

  font-size: 22px;

  @media (max-width: ${sizes.md}px) {
    font-size: 16px;
  }
`;
