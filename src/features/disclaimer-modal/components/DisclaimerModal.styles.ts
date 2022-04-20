import styled from "styled-components";

import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 42rem;
  border-radius: 10px;
  background-color: #283841;
  overflow-x: hidden;
  overflow-y: auto;

  gap: 3rem;
  padding: 3rem 4rem;

  ${screens.md} {
    gap: 2rem;
    padding: 1.5rem;
  }
`;

export const Title = styled.h1`
  font-family: "Sofia Sans";
  font-weight: 700;
  color: #ffffff;
  text-align: center;
  margin: 0;

  font-size: 2rem;

  ${screens.md} {
    font-size: 1.6rem;
  }
`;

export const UnorderedList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-left: 2rem;
  margin: 0;
`;

export const ListItem = styled.li`
  font-family: "Sofia Sans";
  font-weight: 300;
  font-size: 1.4rem;
  color: #ffffff;
`;
