import styled from "styled-components";
import { motion } from "framer-motion";

interface Colored {
  color: string;
}

export const VaultContainer = styled(motion.div).attrs<Colored>(
  ({ color }) => ({
    initial: {
      y: 50,
      opacity: 0,
    },

    animate: {
      y: 0,
      opacity: 1,
    },

    whileHover: { y: -10, boxShadow: `0 0 20px ${color}` },

    whileTap: {
      scale: 0.97,
      boxShadow: `0 0 10px ${color}`,
      opacity: 0.8,
    },
  })
)<Colored>`
  display: flex;
  flex-direction: column;
  width: 400px;
  border-radius: 10px;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ color }) => color};
  cursor: pointer;
`;

export const HeaderContainer = styled.div`
  display: flex;
`;

export const TypeContainer = styled.div<Colored>`
  display: flex;
  flex: 1;
  align-items: center;
  background-color: ${({ color }) => color};
  padding: 15px 25px;
`;

export const TypeTitle = styled.h3`
  font-family: Barlow;
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
`;

export const ILModeContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #233446;
  box-shadow: inset 2px 0px 4px rgba(0, 0, 0, 0.5);
`;

export const ILModeTitle = styled.div`
  font-family: Roboto;
  font-weight: 400;
  font-size: 14px;
  color: #ffffff;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 25px;
  padding: 20px 25px;
  background-color: #16192e;
`;

export const VaultTitle = styled.h1`
  font-family: Roboto;
  font-weight: 700;
  font-size: 28px;
  color: #ffffff;
  margin: 0;
`;

export const Description = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 13px;
  color: #ffffff;
`;

export const APYTitle = styled.div`
  font-family: Barlow;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
`;

export const APYValue = styled.span<Colored>`
  font-family: Barlow;
  font-weight: 700;
  font-size: 52px;
  color: ${({ color }) => color};
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
  background-color: #233447;
`;

export const PositionTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PositionTitle = styled.span`
  font-family: Barlow;
  font-weight: 700;
  font-size: 14px;
  color: #ffffff;
`;

export const PositionAssetContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const PositionAsset = styled.span<Colored>`
  font-family: Barlow;
  font-weight: 600;
  font-size: 28px;
  color: ${({ color }) => color};
`;

export const Wrapper = styled.div``;
