import styled from "styled-components";

import { sizes } from "../constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 7px 14px;
  min-width: 260px;
  background-color: #010c1a;
  border-radius: 10px;

  @media (max-width: ${sizes.md}px) {
    min-width: 160px;
  }
`;

export const MetricTitle = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
`;

export const MetricValue = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 22px;
  color: #259ddf;
`;
