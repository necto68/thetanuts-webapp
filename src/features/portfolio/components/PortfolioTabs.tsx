import { AnimatePresence } from "framer-motion";
import { useState } from "react";

import { TabType } from "../types";

import { TabButton } from "./TabButton";
import { PositionsTable } from "./PositionsTable";
import { TransactionHistoryTable } from "./TransactionHistoryTable";
import {
  PositionsTabContainer,
  TabContainer,
  TabsHeaderContainer,
  Container,
  TransactionHistoryTabContainer,
} from "./PortfolioTabs.styles";

export const PortfolioTabs = () => {
  const [activeTab, setActiveTab] = useState(TabType.positions);

  const isPositionsTab = activeTab === TabType.positions;

  return (
    <Container>
      <TabsHeaderContainer>
        <TabButton
          isActive={isPositionsTab}
          onClick={() => {
            setActiveTab(TabType.positions);
          }}
        >
          Positions
        </TabButton>
        <TabButton
          isActive={!isPositionsTab}
          onClick={() => {
            setActiveTab(TabType.transactionHistory);
          }}
        >
          Transaction History
        </TabButton>
      </TabsHeaderContainer>
      <TabContainer>
        <AnimatePresence exitBeforeEnter initial={false}>
          {isPositionsTab ? (
            <PositionsTabContainer key={isPositionsTab.toString()}>
              <PositionsTable />
            </PositionsTabContainer>
          ) : (
            <TransactionHistoryTabContainer key={isPositionsTab.toString()}>
              <TransactionHistoryTable />
            </TransactionHistoryTabContainer>
          )}
        </AnimatePresence>
      </TabContainer>
    </Container>
  );
};
