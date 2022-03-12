import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useWallet } from "@gimmixorg/use-wallet";

import { TabType } from "../types";
import { CellValue } from "../../table/components";

import { TabButton } from "./TabButton";
import { PositionsTable } from "./PositionsTable";
import {
  Container,
  TabContainer,
  TabsHeaderContainer,
  TabsLayout,
  Title,
  TitleContainer,
  PositionsTabContainer,
  TransactionHistoryTabContainer,
} from "./PortfolioLayout.styles";
import { TransactionHistoryTable } from "./TransactionHistoryTable";

export const PortfolioLayout = () => {
  const { account } = useWallet();
  const [activeTab, setActiveTab] = useState(TabType.positions);

  const isPositionsTab = activeTab === TabType.positions;

  if (!account) {
    return (
      <Container>
        <TitleContainer>
          <Title>Portfolio</Title>
        </TitleContainer>
        <TabsLayout>
          <TabContainer>
            <CellValue>Please, connect wallet</CellValue>
          </TabContainer>
        </TabsLayout>
      </Container>
    );
  }

  return (
    <Container>
      <TitleContainer>
        <Title>Portfolio</Title>
      </TitleContainer>
      <TabsLayout>
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
              <PositionsTabContainer>
                <PositionsTable />
              </PositionsTabContainer>
            ) : (
              <TransactionHistoryTabContainer>
                <TransactionHistoryTable />
              </TransactionHistoryTabContainer>
            )}
          </AnimatePresence>
        </TabContainer>
      </TabsLayout>
    </Container>
  );
};
