import { Container, InfoValue } from "./ConsolidatedApyInfo.styles";
import { VaultsTable } from "./VaultsTable";

export const ConsolidatedApyInfo = () => (
  <Container>
    <InfoValue>Management Fee = 0.0%</InfoValue>
    <InfoValue>Performance Fee = 0.0%</InfoValue>
    <VaultsTable />
  </Container>
);
