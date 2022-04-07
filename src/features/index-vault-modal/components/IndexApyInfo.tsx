import { Container, InfoValue } from "./IndexApyInfo.styles";
import { VaultsTable } from "./VaultsTable";

export const IndexApyInfo = () => (
  <Container>
    <InfoValue>Management Fee = 0.0%</InfoValue>
    <InfoValue>Performance Fee = 0.0%</InfoValue>
    <VaultsTable />
  </Container>
);
