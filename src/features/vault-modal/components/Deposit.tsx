import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useWallet } from "@gimmixorg/use-wallet";

import { addressFormatter } from "../../shared/helpers";
import { WalletButton } from "../../wallet/components";
import { useModalVault } from "../hooks";

import { DepositTab } from "./DepositTab";
import { WithdrawTab } from "./WithdrawTab";
import {
  DepositContainer,
  TabsContainer,
  TabButtonContainer,
  TabButton,
  ContentContainer,
  FooterContainer,
  ContractAddress,
} from "./Deposit.styles";

enum TabType {
  deposit = "deposit",
  withdraw = "withdraw",
}

export const Deposit = () => {
  const { account } = useWallet();
  const vault = useModalVault();
  const [activeTab, setActiveTab] = useState(TabType.deposit);

  if (!vault) {
    return null;
  }

  const isDepositTab = activeTab === TabType.deposit;
  const isWithdrawTab = activeTab === TabType.withdraw;

  const CurrentTab = isDepositTab ? DepositTab : WithdrawTab;

  return (
    <DepositContainer>
      <TabsContainer>
        <TabButtonContainer active={isDepositTab}>
          <TabButton
            active={isDepositTab}
            onClick={() => {
              setActiveTab(TabType.deposit);
            }}
          >
            {TabType.deposit}
          </TabButton>
        </TabButtonContainer>
        <TabButtonContainer active={isWithdrawTab}>
          <TabButton
            active={isWithdrawTab}
            onClick={() => {
              setActiveTab(TabType.withdraw);
            }}
          >
            {TabType.withdraw}
          </TabButton>
        </TabButtonContainer>
      </TabsContainer>
      <ContentContainer>
        <AnimatePresence exitBeforeEnter initial={false}>
          {account ? <CurrentTab key={activeTab} /> : <WalletButton />}
        </AnimatePresence>
      </ContentContainer>
      <FooterContainer>
        <ContractAddress>{`Contract: ${addressFormatter(
          vault.address
        )}`}</ContractAddress>
      </FooterContainer>
    </DepositContainer>
  );
};
