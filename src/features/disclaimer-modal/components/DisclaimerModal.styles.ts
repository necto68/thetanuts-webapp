import styled from "styled-components";

import { sizes } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 550px;
  border-radius: 10px;
  background-color: #283841;
  overflow-x: hidden;
  overflow-y: auto;

  gap: 40px;
  padding: 25px 35px;

  @media (max-width: ${sizes.md}px) {
    gap: 20px;
    padding: 15px 15px;
  }
`;

export const Title = styled.h1`
  font-family: "Sofia Sans";
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin: 0;

  font-size: 28px;

  @media (max-width: ${sizes.md}px) {
    font-size: 16px;
  }
`;

export const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin: 0;
`;

export const ListItem = styled.li`
  font-family: "Sofia Sans";
  font-weight: 300;
  color: #ffffff;

  font-size: 22px;

  @media (max-width: ${sizes.md}px) {
    font-size: 14px;
  }
`;
