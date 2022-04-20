import styled from "styled-components";
import { motion } from "framer-motion";

import { screens } from "../../shared/constants";

export const Container = styled(motion.div).attrs(() => ({
  initial: {
    opacity: 0,
    y: 50,
  },

  animate: {
    opacity: 1,
    y: 0,
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
  padding: 0 6px;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(180deg, #2c2c2c 0%, #101010 100%);
  border: 2px solid #81e429;
  cursor: pointer;

  flex-basis: 275px;

  ${screens.md} {
    flex-basis: 340px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

export const AssetTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const AssetTitle = styled.span`
  font-family: Roboto;
  color: #e5e5e5;

  font-weight: 700;
  font-size: 19px;

  ${screens.md} {
    font-weight: 400;
    font-size: 24px;
  }
`;

export const VaultTypeTitle = styled(AssetTitle)`
  color: #ffffff;
  text-align: right;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 8px 16px;
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
  align-items: start;
`;

export const TVLContainer = styled(DataContainer)`
  align-items: end;
`;

export const DataTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  color: #ffffff;

  font-size: 11px;

  ${screens.md} {
    font-size: 14px;
  }
`;

export const DataValue = styled.span`
  font-family: Roboto;
  font-weight: 600;
  color: #ffffff;

  font-size: 22px;

  ${screens.md} {
    font-size: 28px;
  }
`;

export const APYDataValue = styled(DataValue)`
  font-family: Barlow;
`;

export const SwapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
`;

export const SwapTitle = styled.span`
  font-family: Roboto;
  font-weight: 600;

  background: linear-gradient(180deg, #2699da 0%, #63b22d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-transform: uppercase;
  text-align: center;

  font-size: 17px;

  ${screens.md} {
    font-size: 22px;
  }
`;
