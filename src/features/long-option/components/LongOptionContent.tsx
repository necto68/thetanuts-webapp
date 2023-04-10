import { LongOptionModal } from "../../long-option-modal/components";

import { AssetHeader } from "./AssetHeader";
import { AssetChart } from "./AssetChart";
import { PositionsTable } from "./PositionsTable";
import { Links } from "./Links";
import {
  Container,
  AssetChartColumnContainer,
  Content,
} from "./LongOptionContent.styles";

export const LongOptionContent = () => (
  <Container>
    <AssetHeader />
    <Content>
      <AssetChartColumnContainer>
        <AssetChart />
        <PositionsTable />
      </AssetChartColumnContainer>
      <Container>
        <LongOptionModal />
        <Links />
      </Container>
    </Content>
  </Container>
);
