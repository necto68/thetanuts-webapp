import styled from "styled-components";

import { sizes } from "../constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #010c1a;
  border-radius: 10px;

  padding: 7px 15px;
  min-width: 260px;

  @media (max-width: ${sizes.md}px) {
    padding: 10px;
    min-width: 120px;
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
  color: #259ddf;

  font-size: 22px;

  @media (max-width: ${sizes.md}px) {
    font-size: 16px;
  }
`;
