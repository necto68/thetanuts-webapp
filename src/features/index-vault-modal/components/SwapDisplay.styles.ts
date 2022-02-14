import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  max-height: 2vh;
  align-items: center;
`;

export const Header = styled.h5`
  font-family: Barlow;
  font-weight: 500;
  font-size: 12px;
`;

export const Balance = styled.h5`
  font-family: Barlow;
  font-weight: 500;
  font-size: 12px;
  flex-direction: row;
`;

export const SwapCard = styled.div`
  background-color: #010c1a;
  border-radius: 9px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const DepositValueEth = styled.h2`
  color: white;
  padding-left: 15px;
  font-family: Barlow;
  font-weight: 500;
  font-size: 22px;
`;

export const DepositValueUsd = styled.h4`
  color: white;
  padding-left: 50px;
  font-family: Barlow;
  font-weight: lighter;
  font-size: 16px;
`;

export const MaxButton = styled.button`
  padding: 12px 18px 8px 18px;
  background-color: #010c1a;
  border-radius: 9px;
  border: 1px solid #1b65de;
  color: white;
  font-size: 11px;
`;

export const AssetInitials = styled.h4`
  color: white;
  font-family: Barlow;
  font-weight: lighter;
  font-size: 16px;
  padding: 2px 20px 0px 20px;
`;

export const FlipButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 15px;
`;

export const FlipButton = styled.button`
  background-color: #010c1a;
  border-radius: 50%;
  padding: 18px;
  cursor: pointer;
`;
