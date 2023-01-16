import { useState, useCallback } from "react";

import { Expander } from "../../index-vault-modal/components/Expander";
import { SectionType } from "../../index-vault-modal/types";
import {
  Container as VaultInfoContainer,
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";
import { ReturnOverviewTabType } from "../types";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";

import { ReturnOverviewSwitcher } from "./ReturnOverviewSwitcher";
import { Content } from "./ReturnOverview.styles";

export const ReturnOverview = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [currentTabType, setCurrentTabType] = useState(
    ReturnOverviewTabType.successEpoch
  );

  const handleTabButtonClick = useCallback((tabType: ReturnOverviewTabType) => {
    setCurrentTabType(tabType);
  }, []);

  const { basicVaultQuery } = useBasicModalConfig();
  const { isLoading } = basicVaultQuery;

  const loadingPlaceholder = ".....";

  return (
    <Expander
      isOpen={isOpen}
      onArrowClick={() => {
        setIsOpen(!isOpen);
      }}
      title="Return Overview (Scenarios)"
      type={SectionType.returnOverview}
    >
      <Content>
        <ReturnOverviewSwitcher
          currentTabType={currentTabType}
          onTabButtonClick={handleTabButtonClick}
        />
        <VaultInfoContainer>
          <InfoContainer>
            <InfoTitle>Active Position</InfoTitle>
            <InfoValue isAlignRight>
              {isLoading ? loadingPlaceholder : "XXX USDC"}
            </InfoValue>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>Yield</InfoTitle>
            <InfoValue isAlignRight>
              {isLoading ? loadingPlaceholder : "XXX USDC"}
            </InfoValue>
          </InfoContainer>
          <InfoContainer>
            <InfoTitle>You will Receive</InfoTitle>
            <InfoValue isAlignRight>
              {isLoading ? loadingPlaceholder : "XXX USDC"}
            </InfoValue>
          </InfoContainer>
        </VaultInfoContainer>
      </Content>
    </Expander>
  );
};
