import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { useWallet } from '@gimmixorg/use-wallet';
import { BaseButton } from '../../shared/components';
import { addressFormatter } from '../../shared/helpers';
import { WalletButton } from '../../wallet/components';
import { useModalVault } from '../hooks';
import { DepositTab } from './DepositTab';
import { WithdrawTab } from './WithdrawTab';

enum DepositTabs {
  deposit = 'deposit',
  withdraw = 'withdraw',
}

export const Deposit = () => {
  const { account } = useWallet();
  const vault = useModalVault();
  const [activeTab, setActiveTab] = useState(DepositTabs.deposit);

  if (!vault) {
    return null;
  }

  const isDepositTab = activeTab === DepositTabs.deposit;
  const isWithdrawTab = activeTab === DepositTabs.withdraw;

  const CurrentTab = isDepositTab ? DepositTab : WithdrawTab;

  return (
    <DepositContainer>
      <TabsContainer>
        <TabButtonContainer active={isDepositTab}>
          <TabButton
            active={isDepositTab}
            onClick={() => {
              setActiveTab(DepositTabs.deposit);
            }}
          >
            {DepositTabs.deposit}
          </TabButton>
        </TabButtonContainer>
        <TabButtonContainer active={isWithdrawTab}>
          <TabButton
            active={isWithdrawTab}
            onClick={() => {
              setActiveTab(DepositTabs.withdraw);
            }}
          >
            {DepositTabs.withdraw}
          </TabButton>
        </TabButtonContainer>
      </TabsContainer>
      <ContentContainer>
        <AnimatePresence initial={false} exitBeforeEnter>
          {account ? <CurrentTab key={activeTab} /> : <WalletButton />}
        </AnimatePresence>
      </ContentContainer>
      <FooterContainer>
        <ContractAddress>{`Contract: ${addressFormatter(
          vault.address,
        )}`}</ContractAddress>
      </FooterContainer>
    </DepositContainer>
  );
};

const DepositContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  background-color: #32343a;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
`;

const TabsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const TabButtonContainer = styled(motion.div).attrs<{
  active: boolean;
}>(({ active }) => ({
  animate: {
    backgroundColor: active ? 'rgba(71,74,83, 0)' : 'rgba(71,74,83, 1)',
  },
}))<{ active: boolean }>`
  display: flex;
  flex: 1;
`;

const TabButton = styled(BaseButton).attrs<{ active: boolean }>(
  ({ active }) => ({
    primaryColor: active ? '#ffffff' : '#9E9E9E',
  }),
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

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
`;

const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px 0;
  border-top: 1px solid #5d5d5d;
`;

const ContractAddress = styled.span`
  font-family: Roboto;
  font-weight: 400;
  font-size: 16px;
  color: #9e9e9e;
`;
