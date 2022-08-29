import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  min-width: 128px;

  ${screens.md} {
    flex-direction: row;
    min-width: 120px;

    background-color: #010c1a;
    border-radius: 4px;
    padding: 6px 10px;
    align-items: center;
  }
`;

export const MetricTitleContainer = styled.div`
  padding: 0 10px;

  ${screens.md} {
    padding: 0;
  }
`;

export const MetricValueContainer = styled(MetricTitleContainer)`
  background-color: #010c1a;
  border-radius: 10px;
  padding: 6px 10px;

  ${screens.md} {
    padding: 0;
  }
`;

export const MetricTitle = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 14px;
  color: #ffffff;

  ${screens.md} {
    font-weight: 700;
  }
`;

export const MetricValue = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 16px;
  color: #1fffab;
`;
