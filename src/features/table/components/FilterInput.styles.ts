import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 20px;
  padding: 12px 15px;
  border: 1px solid #ffffff;
  border-radius: 10px;
`;

export const Input = styled.input`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
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
