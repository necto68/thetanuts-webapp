import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 25px;
  background-color: rgba(1, 12, 26, 0.7);
  border-radius: 10px;

  padding: 40px;

  @media (max-width: ${sizes.md}px) {
    padding: 15px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  gap: 25px;
`;

export const DescriptionContainer = styled(ContentContainer)`
  flex-direction: column;
`;

export const BasketIconContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: ${sizes.md}px) {
    display: none;
  }
`;

export const Title = styled.span`
  font-family: Roboto;
  font-weight: 700;
  color: #e5e5e5;

  font-size: 32px;

  @media (max-width: ${sizes.md}px) {
    font-size: 26px;
  }
`;

export const Description = styled.p`
  font-family: Roboto;
  font-weight: 400;
  color: #e5e5e5;
  margin: 0;

  font-size: 18px;

  @media (max-width: ${sizes.md}px) {
    font-size: 14px;
  }
`;
