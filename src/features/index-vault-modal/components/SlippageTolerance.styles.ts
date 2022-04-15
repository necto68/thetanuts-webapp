import styled from "styled-components";

import { defaultSlippageToleranceValue } from "../constants";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  padding: 5px 10px;
  background-color: #ffffff;
  border-radius: 10px;
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
  font-size: 16px;
  color: ${({ isError }) => (isError ? "#EB5853" : "#061f3a")};

  width: 23px;
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
  font-size: 16px;
  color: ${({ isError }) => (isError ? "#EB5853" : "#061f3a")};
`;
