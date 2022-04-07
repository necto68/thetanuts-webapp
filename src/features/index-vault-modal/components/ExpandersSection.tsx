import { useCallback, useState } from "react";

import { useSwapRouterConfig } from "../hooks";

import { Expander } from "./Expander";
import { IndexApyInfo } from "./IndexApyInfo";
import { IndexInfo } from "./IndexInfo";
import { Container } from "./ExpandersSection.styles";

export enum SectionType {
  indexAPY = "indexAPY",
  indexInfo = "indexInfo",
}

export const ExpandersSection = () => {
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

  return (
    <Container>
      <Expander
        isOpen={openedSection === SectionType.indexAPY}
        onArrowClick={handleArrowClick}
        title={`Index APY% = ${indexAPY}%`}
        type={SectionType.indexAPY}
      >
        <IndexApyInfo />
      </Expander>
      <Expander
        isOpen={openedSection === SectionType.indexInfo}
        onArrowClick={handleArrowClick}
        title="Index Information"
        type={SectionType.indexInfo}
      >
        <IndexInfo />
      </Expander>
    </Container>
  );
};
