import { ExpandersSection, SectionType } from "./ExpandersSection";
import { Container } from "./SwapContent.styles";
import { WithdrawClaimSection } from "./WithdrawClaimSection";

export const WithdrawClaimContent = () => (
  <Container>
    <WithdrawClaimSection />
    <ExpandersSection sections={[SectionType.withdrawSchedule]} />
  </Container>
);
