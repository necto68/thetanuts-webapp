import styled from "styled-components";
import { motion } from "framer-motion";

import { BaseButton } from "../../shared/components";

export const DepositContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #32343a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

export const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const TabButtonContainer = styled(motion.div).attrs<{
  active: boolean;
}>(({ active }) => ({
  animate: {
    backgroundColor: active ? "rgba(71,74,83, 0)" : "rgba(71,74,83, 1)",
  },
}))<{ active: boolean }>`
  display: flex;
  flex: 1;
`;

export const TabButton = styled(BaseButton).attrs<{ active: boolean }>(
  ({ active }) => ({
    primaryColor: active ? "#ffffff" : "#9E9E9E",
  })
)<{
  active: boolean;
}>`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 15px 0;

  border: 0;
  box-shadow: none !important;
  border-radius: 0 !important;

  font-family: Roboto;
  font-weight: 700;
  text-transform: uppercase;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
  border-top: 1px solid #5d5d5d;
`;

export const ContractAddress = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  color: #9e9e9e;
`;
