import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const BalanceContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: 2px;
  width: 0;
  padding: 4px 0 0 0;
`;

export const BalanceTitlesContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export const BalanceTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 12px;
  color: #ffffff;
  white-space: nowrap;
`;

export const BalanceMaxButton = styled(BaseButton)`
  padding: 0 2px;
  height: 14px;
  border-radius: 4px;
  background: #ffffff;

  color: #061f3a;
  font-size: 8px;
`;

export const InsufficientBalanceTitle = styled(motion.span).attrs(() => ({
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },

  exit: {
    opacity: 0,
  },
}))`
  font-family: Barlow;
  font-weight: 700;
  font-size: 12px;
  color: #eb5853;
`;

export const SwapInputCardAnimateContainer = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border-radius: 4px;
  padding: 15px;
  background-color: ${({ disabled }) => (disabled ? "#949494" : "#323844")};
`;

export const SwapInputCardContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 15px;
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
  align-items: end;
  gap: 5px;
`;

export const SwapInput = styled.input.attrs<{ isError?: boolean }>(() => ({
  type: "number",
  inputMode: "decimal",
  placeholder: "0",
  min: "0",
  step: "any",
}))<{ isError?: boolean }>`
  font-family: Roboto;
  font-weight: 400;
  font-size: 22px;
  color: ${({ isError }) => (isError ? "#EB5853" : "#e5e5e5")};
  width: 100%;
  padding: 0;
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

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PriceValue = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #e5e5e5;
  max-width: 120px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

export const AssetTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const AssetTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
`;
