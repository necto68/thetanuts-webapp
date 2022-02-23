import styled from "styled-components";
import { motion } from "framer-motion";

export const Container = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
  },

  animate: {
    opacity: 1,
  },

  whileHover: { y: -10, boxShadow: "0 0 20px #81E429" },

  whileTap: {
    scale: 0.97,
    boxShadow: "0 0 10px #81E429",
    opacity: 0.8,
  },
}))`
  display: flex;
  flex-direction: column;
  width: 340px;
  padding: 8px;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(180deg, #2c2c2c 0%, #101010 100%);
  border: 2px solid #81e429;
  cursor: pointer;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

export const TypeTitle = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 28px;
  color: #ffffff;
`;

export const AssetTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 24px;
  color: #e5e5e5;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 8px;
  border-top: 1px solid #5d5d5d;
  border-bottom: 1px solid #5d5d5d;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: center;
`;

export const APYContainer = styled(DataContainer)`
  align-items: flex-start;
`;

export const TVLContainer = styled(DataContainer)`
  align-items: flex-end;
`;

export const DataTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
`;

export const DataValue = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 28px;
  color: #ffffff;
`;

export const SwapTitle = styled.span`
  font-family: Roboto;
  font-weight: 600;
  font-size: 22px;

  background: linear-gradient(180deg, #2699da 0%, #63b22d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  text-transform: uppercase;
  text-align: center;
`;
