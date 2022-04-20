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
  padding: 0 0.6rem;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(180deg, #2c2c2c 0%, #101010 100%);
  border: 2px solid #81e429;
  cursor: pointer;

  flex-basis: 27.5rem;

  ${screens.md} {
    flex-basis: 34rem;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem;
`;

export const AssetTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const AssetTitle = styled.span`
  font-family: Roboto;
  color: #e5e5e5;

  font-weight: 700;
  font-size: 1.9rem;

  ${screens.md} {
    font-weight: 400;
    font-size: 2.4rem;
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
  padding: 1.2rem 0.8rem 1.6rem;
  border-top: 1px solid #5d5d5d;
  border-bottom: 1px solid #5d5d5d;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
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

  font-size: 1.1rem;

  ${screens.md} {
    font-size: 1.4rem;
  }
`;

export const DataValue = styled.span`
  font-family: Roboto;
  font-weight: 600;
  color: #ffffff;

  font-size: 2.2rem;

  ${screens.md} {
    font-size: 2.8rem;
  }
`;

export const APYDataValue = styled(DataValue)`
  font-family: Barlow;
`;

export const SwapContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.4rem 0;
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

  font-size: 1.7rem;

  ${screens.md} {
    font-size: 2.2rem;
  }
`;
