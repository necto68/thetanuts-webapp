import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 420px;
  border-radius: 10px;
  background-color: #283841;
  overflow-x: hidden;
  overflow-y: auto;

  gap: 30px;
  padding: 30px 40px;

  ${screens.md} {
    gap: 20px;
    padding: 15px;
  }
`;

export const Title = styled.h1`
  font-family: "Sofia Sans";
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin: 0;

  font-size: 20px;

  ${screens.md} {
    font-size: 16px;
  }
`;

export const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-left: 20px;
  margin: 0;
`;

export const ListItem = styled.li`
  font-family: "Sofia Sans";
  font-weight: 300;
  font-size: 14px;
  color: #ffffff;
`;
