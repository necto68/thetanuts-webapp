import { SectionType } from "../types";

import { ExpandersSection } from "./ExpandersSection";
import { Container } from "./SwapContent.styles";
import { WithdrawSection } from "./WithdrawSection";

export const WithdrawContent = () => (
  <Container>
    <WithdrawSection />
    <ExpandersSection
      sections={[SectionType.withdrawSchedule, SectionType.analytics]}
    />
  </Container>
);
