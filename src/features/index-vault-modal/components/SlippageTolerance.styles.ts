import styled from "styled-components";

import { defaultSlippageToleranceValue } from "../constants";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2rem;
  padding: 0.5rem 1rem;
  background-color: #ffffff;
  border-radius: 5px;
`;

export const Input = styled.input.attrs(() => ({
  type: "number",
  inputMode: "decimal",
  placeholder: defaultSlippageToleranceValue,
  min: "0.1",
  max: "1",
  step: "0.1",
}))<{ isError?: boolean }>`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1.2rem;
  color: ${({ isError }) => (isError ? "#EB5853" : "#061f3a")};

  width: 2rem;
  padding: 0;
  border: 0;
  background-color: transparent;
  outline: none;
  text-align: right;

  &::placeholder {
    color: #9e9e9e;
  }

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
`;

export const Title = styled.span<{ isError?: boolean }>`
  font-family: Roboto;
  font-weight: 400;
  font-size: 1.2rem;
  color: ${({ isError }) => (isError ? "#EB5853" : "#061f3a")};
`;
