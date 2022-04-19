import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1.2rem 1.5rem;
  border: 1px solid #ffffff;
  border-radius: 10px;
`;

export const Input = styled.input`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1.2rem;
  color: #ffffff;
  width: 100%;
  padding: 0;
  border: 0;
  background-color: transparent;
  outline: none;

  &::placeholder {
    color: #9e9e9e;
  }
`;
