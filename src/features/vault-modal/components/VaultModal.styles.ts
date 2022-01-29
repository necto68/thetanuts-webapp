import styled from "styled-components";

import { BaseButton } from "../../shared/components";

interface Colored {
  color: string;
}

export const VaultModalContainer = styled.div<Colored>`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 950px;
  max-height: 100vh;
  border-radius: 10px;
  overflow: hidden;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ color }) => color};
  box-shadow: 0 0 20px ${({ color }) => color};
`;

export const HeaderContainer = styled.div<Colored>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ color }) => color};
  padding: 7px;
`;

export const TypeTitle = styled.h2`
  font-family: Barlow;
  font-weight: 700;
  font-size: 24px;
  color: #ffffff;
  text-transform: uppercase;
  margin: 0;
`;

export const CloseButton = styled(BaseButton)`
  border-radius: 50%;
  padding: 5px 12px;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 25px;
  background-color: #252629;
  overflow: auto;
`;

export const MainContentContainer = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 950px) {
    flex-direction: column;
  }
`;

export const InfoContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #5d5d5d;
  padding: 25px 0;

  &:first-child {
    padding: 0 0 25px;
  }
`;

export const AssetTitle = styled.span`
  font-family: Roboto;
  font-weight: 500;
  font-size: 28px;
  color: #ffffff;
`;

export const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DataTitle = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 12px;
  color: #cfcfcf;
`;

export const DataValue = styled.span`
  font-family: Barlow;
  font-weight: 500;
  font-size: 18px;
  color: #ffffff;
  text-transform: uppercase;
`;

export const VaultDataContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;

  ${DataContainer} {
    flex: 1;
  }
`;

export const PriceTitle = styled(DataTitle)`
  font-size: 14px;
`;

export const PriceValue = styled(DataValue)`
  font-size: 26px;
`;

export const APYValue = styled(DataValue)`
  color: #03f43e;
`;

export const DescriptionTitle = styled.p`
  font-family: Roboto;
  font-weight: 700;
  font-size: 15px;
  color: #ffffff;
  margin: 20px 0 0 0;
`;

export const Description = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 9px;
  color: #c4c4c4;
`;

export const DepositContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
