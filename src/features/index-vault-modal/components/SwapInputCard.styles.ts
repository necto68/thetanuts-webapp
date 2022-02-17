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
  justify-content: space-between;
  align-items: center;
  padding: 5px 15px;
`;

export const BalanceTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 14px;
`;

export const SwapInputCardAnimateContainer = styled(motion.div).attrs<{
  downDirection: boolean;
}>(({ downDirection }) => ({
  initial: {
    rotateX: downDirection ? "90deg" : "-90deg",
    transformPerspective: 300,
  },

  animate: {
    rotateX: "0deg",
    transformPerspective: 300,
  },

  exit: {
    rotateX: downDirection ? "90deg" : "-90deg",
    transformPerspective: 300,
  },

  transition: { duration: 0.3, ease: "linear" },
}))<{ downDirection: boolean }>`
  display: flex;
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
  width: 100%;
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

export const AssetTitle = styled(motion.span).attrs<{ selected?: boolean }>(
  ({ selected = true }) => ({
    initial: false,

    animate: {
      color: selected ? "#e5e5e5" : "#9e9e9e",
    },
  })
)<{ selected?: boolean }>`
  font-family: Roboto;
  font-weight: 400;
  font-size: 18px;
`;

export const AssetArrow = styled(motion.span).attrs<{ isRotate: boolean }>(
  ({ isRotate }) => ({
    initial: false,

    animate: {
      rotate: isRotate ? "-180deg" : "0deg",
    },
  })
)<{ isRotate: boolean }>`
  font-family: Roboto;
  font-weight: 400;
  font-size: 18px;
`;

export const SwitchAssetButton = styled(BaseButton)`
  padding: 5px 15px;
  border-radius: 10px;
`;

export const SwitchAssetContainer = styled.div`
  display: flex;
  gap: 5px;
`;

export const MaxButton = styled(SwitchAssetButton)`
  font-size: 14px;
`;
