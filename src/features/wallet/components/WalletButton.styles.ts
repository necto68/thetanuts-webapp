import styled from "styled-components";

import { BaseButton } from "../../shared/components";

export const WalletInfo = styled.div`
  display: flex;
  position: relative;
`;

export const WalletConnectedButton = styled(BaseButton)`
  padding-left: 8px;
  padding-right: 8px;
`;

export const Separator = styled.div`
  width: 100%;
  background-color: #e5e5e5;
  height: 1px;
`;

export const WalletInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #1a1d23;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  padding: 16px 12px;
  gap: 12px;
  color: #ffffff;
`;

export const WalletInfoAddress = styled.span`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const ButtonContentContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const WalletInfoAddressText = styled.span`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
`;

export const WalletAddressAvatar = styled.img`
  width: 16px;
  height: 16px;
  border-radius: 50%;
`;
export const WalletInfoAddressAvatar = styled(WalletAddressAvatar)`
  width: 32px;
  height: 32px;
`;

export const DisconnectAction = styled.button`
  padding: 2px 4px;
  height: 20px;
  width: 85px;
  background: #323844;
  border-radius: 4px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 12.44px;
  line-height: 16px;
  color: #ffffff;
  border: none;
  cursor: pointer;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CopyAction = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
`;

export const ExplorerAction = styled.a`
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 16px;
  cursor: pointer;
  text-decoration: none;
  color: #ffffff;

  &:visited {
    color: #ffffff;
  }
`;
