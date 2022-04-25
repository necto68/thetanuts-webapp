import styled from "styled-components";
import { motion } from "framer-motion";

import { screens } from "../../shared/constants";

import type { VaultCardProps } from "./VaultCard";

type ContainerProps = Pick<VaultCardProps, "borderColor" | "disabled">;

export const Container = styled(motion.div).attrs<ContainerProps>(
  ({ borderColor, disabled }) => ({
    initial: {
      opacity: 0,
      y: 50,
    },

    animate: {
      opacity: disabled ? 0.6 : 1,
      y: 0,
    },

    whileHover: !disabled && { y: -10, boxShadow: `0 0 20px ${borderColor}` },

    whileTap: !disabled && {
      scale: 0.97,
      boxShadow: `0 0 10px ${borderColor}`,
      opacity: 0.8,
    },
  })
)<ContainerProps>`
  display: flex;
  flex-direction: column;
  padding: 0 6px;
  border-radius: 10px;
  overflow: hidden;
  background: linear-gradient(180deg, #2c2c2c 0%, #101010 100%);
  border: 2px solid ${({ borderColor }) => borderColor};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};

  flex-basis: 270px;

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

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const Title = styled.span`
  font-family: Roboto;
  color: #e5e5e5;
  line-height: 1;

  font-weight: 700;
  font-size: 19px;

  ${screens.md} {
    font-weight: 400;
    font-size: 24px;
  }
`;

export const SubTitle = styled(Title)`
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

export const LeftDataContainer = styled(DataContainer)`
  align-items: start;
`;

export const RightDataContainer = styled(DataContainer)`
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

export const LeftDataValue = styled.span`
  font-family: Barlow;
  font-weight: 600;
  color: #ffffff;

  font-size: 22px;

  ${screens.md} {
    font-size: 28px;
  }
`;

export const RightDataValue = styled(LeftDataValue)`
  font-family: Roboto;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
`;

export const ButtonTitle = styled.span`
  font-family: Roboto;
  font-weight: 600;

  background: linear-gradient(180deg, #2699da 0%, #63b22d 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
  text-align: center;

  font-size: 17px;

  ${screens.md} {
    font-size: 22px;
  }
`;
