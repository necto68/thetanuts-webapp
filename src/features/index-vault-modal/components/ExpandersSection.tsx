import { useCallback, useState } from "react";

import { Expander } from "./Expander";
import { Container } from "./ExpandersSection.styles";

export enum SectionType {
  consolidatedAPY = "consolidatedAPY",
  indexInfo = "indexInfo",
}

export const ExpandersSection = () => {
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

  return (
    <Container>
      <Expander
        isOpen={openedSection === SectionType.consolidatedAPY}
        onArrowClick={handleArrowClick}
        title="Consolidated APY% = 40.97%"
        type={SectionType.consolidatedAPY}
      >
        <>
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
        </>
      </Expander>
      <Expander
        isOpen={openedSection === SectionType.indexInfo}
        onArrowClick={handleArrowClick}
        title="Index Information"
        type={SectionType.indexInfo}
      >
        <>
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
          123
          <br />
        </>
      </Expander>
    </Container>
  );
};
