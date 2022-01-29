import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

export const TabContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    x: "-50%",
  },

  animate: {
    opacity: 1,
    x: 0,
  },

  exit: {
    opacity: 0,
    x: "-50%",

    transition: {
      type: "linear",
    },
  },
}))`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  padding: 10px 20px;
  overflow: hidden;
`;

export const CurrentPositionContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const PositionTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;
  line-height: 18px;
  color: #ffffff;
`;

export const PositionValue = styled(PositionTitle)`
  font-weight: 700;
`;

export const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const InputWrapper = styled(motion.div).attrs<{ isError: boolean }>(
  ({ isError }) => ({
    animate: {
      outlineColor: isError ? "rgba(255, 77, 77, 1)" : "rgba(255, 77, 77, 0)",
    },
  })
)<{ isError: boolean }>`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  gap: 5px;
  padding: 10px;
  background-color: #ffffff;
  border-radius: 5px;

  outline-width: 2px;
  outline-style: solid;
`;

export const DepositInput = styled.input.attrs(() => ({
  placeholder: "0",
  type: "number",
}))`
  display: flex;
  flex: 1;

  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
  border: 0;
  text-align: right;

  &::placeholder {
    color: #9e9e9e;
  }
`;

export const DepositSymbol = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;
  color: #000000;
`;

export const MaxButton = styled(BaseButton)`
  padding: 9px;
`;

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ErrorTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 14px;
  color: #ff4d4d;
`;

export const UnlockAssetContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    y: "-40px",
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: "-40px",

    transition: {
      type: "linear",
    },
  },
}))`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  margin-top: auto;
`;

export const UnlockAssetTitle = styled.span`
  font-family: Barlow;
  font-weight: 400;
  font-size: 18px;
  color: #1ce260;
`;

export const UnlockAssetButtons = styled.div`
  display: flex;
  gap: 10px;
`;

export const DepositButtonContainer = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    y: "40px",
  },

  animate: {
    opacity: 1,
    y: 0,
  },

  exit: {
    opacity: 0,
    y: "40px",

    transition: {
      type: "linear",
    },
  },
}))`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: auto;
`;
