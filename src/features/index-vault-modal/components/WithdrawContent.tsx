import { ExpandersSection, SectionType } from "./ExpandersSection";
import { Container } from "./SwapContent.styles";
import { WithdrawSection } from "./WithdrawSection";

export const WithdrawContent = () => (
  <Container>
    <WithdrawSection />
    <ExpandersSection sections={[SectionType.withdrawSchedule]} />
  </Container>
);
