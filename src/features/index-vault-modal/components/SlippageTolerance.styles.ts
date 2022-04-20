import styled from "styled-components";

import { defaultSlippageToleranceValue } from "../constants";

export const Container = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
  padding: 2px 5px;
  border-radius: 4px;
  border: 1px solid #061f3a;
`;

export const Input = styled.input.attrs(() => ({
  type: "number",
  inputMode: "decimal",
  placeholder: defaultSlippageToleranceValue,
  min: "0.1",
  max: "1",
  step: "0.1",
}))<{ isError?: boolean }>`
  font-family: Barlow;
  font-weight: 500;
  font-size: 14px;
  color: ${({ isError }) => (isError ? "#EB5853" : "#061f3a")};

  width: 22px;
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

export const Title = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 14px;
`;
