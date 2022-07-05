import { SectionType } from "../types";

import { ExpandersSection } from "./ExpandersSection";
import { Container } from "./SwapContent.styles";
import { WithdrawClaimSection } from "./WithdrawClaimSection";

export const WithdrawClaimContent = () => (
  <Container>
    <WithdrawClaimSection />
    <ExpandersSection
      sections={[SectionType.withdrawSchedule, SectionType.indexInfo]}
    />
  </Container>
);
