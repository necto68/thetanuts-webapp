import styled from "styled-components";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
  background-color: #061f3a;
  border-radius: 10px;
  padding: 15px;
`;

export const SwapInputContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
`;

export const AssetContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
`;

export const SwapInput = styled.input.attrs(() => ({
  placeholder: "0",
  type: "number",
}))`
  font-family: Roboto;
  font-weight: 400;
  font-size: 28px;
  color: #e5e5e5;
  border-radius: 10px;
  border: 0;
  background-color: transparent;
  outline: none;

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

export const PriceTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #e5e5e5;
`;

export const AssetTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 18px;
  color: #e5e5e5;
`;

export const MaxButton = styled(BaseButton).attrs(() => ({
  primaryColor: "#ffffff",
}))`
  font-size: 14px;
  padding: 5px 15px;
  border-radius: 10px;
`;
