import { useCallback, useState } from "react";

import { useIndexVaultModalState } from "../hooks";
import { useIndexVault } from "../../index-vault/hooks";

import { Expander } from "./Expander";
import { ConsolidatedApyInfo } from "./ConsolidatedApyInfo";
import { IndexInfo } from "./IndexInfo";
import { Container } from "./ExpandersSection.styles";

export enum SectionType {
  consolidatedAPY = "consolidatedAPY",
  indexInfo = "indexInfo",
}

export const ExpandersSection = () => {
  const [{ indexVaultId }] = useIndexVaultModalState();
  const { isLoading, data } = useIndexVault(indexVaultId);

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

  const consolidatedAPY =
    !isLoading && data ? data.totalAnnualPercentageYield : ".....";

  return (
    <Container>
      <Expander
        isOpen={openedSection === SectionType.consolidatedAPY}
        onArrowClick={handleArrowClick}
        title={`Consolidated APY% = ${consolidatedAPY}%`}
        type={SectionType.consolidatedAPY}
      >
        <ConsolidatedApyInfo />
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
