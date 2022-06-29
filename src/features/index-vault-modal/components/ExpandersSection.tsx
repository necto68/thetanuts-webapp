import type { FC } from "react";
import { useCallback, useState } from "react";

import { useSwapRouterConfig } from "../hooks";

import { Expander } from "./Expander";
import { IndexApyInfo } from "./IndexApyInfo";
import { IndexInfo } from "./IndexInfo";
import { Container } from "./ExpandersSection.styles";
import { IndexWithdrawSchedule } from "./IndexWithdrawSchedule";

export enum SectionType {
  indexAPY = "indexAPY",
  indexInfo = "indexInfo",
  withdrawSchedule = "withdrawSchedule",
}

export const ExpandersSection: FC<{ sections?: SectionType[] }> = ({
  sections,
}) => {
  const defaultSections = [SectionType.indexAPY, SectionType.indexInfo];
  const { indexVaultQuery } = useSwapRouterConfig();
  const { isLoading, data } = indexVaultQuery;

  const [openedSection, setOpenedSection] = useState<SectionType | null>(null);

  const handleArrowClick = useCallback(
    (sectionType: SectionType) => {
      if (sectionType !== openedSection) {
        setOpenedSection(sectionType);
      } else {
        setOpenedSection(null);
      }
    },
    [openedSection]
  );

  const indexAPY =
    !isLoading && data
      ? data.totalPercentageYields.annualPercentageYield
      : ".....";

  const isVisible = (type: SectionType): boolean =>
    (sections ?? defaultSections).includes(type);

  return (
    <Container>
      {isVisible(SectionType.indexAPY) && (
        <Expander
          isOpen={openedSection === SectionType.indexAPY}
          maxHeight={215}
          onArrowClick={handleArrowClick}
          title={`Stronghold APY% = ${indexAPY}%`}
          type={SectionType.indexAPY}
        >
          <IndexApyInfo />
        </Expander>
      )}
      {isVisible(SectionType.indexInfo) && (
        <Expander
          isOpen={openedSection === SectionType.indexInfo}
          onArrowClick={handleArrowClick}
          title="Stronghold Information"
          type={SectionType.indexInfo}
        >
          <IndexInfo />
        </Expander>
      )}
      {isVisible(SectionType.withdrawSchedule) && (
        <Expander
          isOpen={openedSection === SectionType.withdrawSchedule}
          onArrowClick={handleArrowClick}
          title="Direct Withdraw Schedule"
          type={SectionType.withdrawSchedule}
        >
          <IndexWithdrawSchedule />
        </Expander>
      )}
    </Container>
  );
};
