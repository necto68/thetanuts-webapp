import { LongOptionModal } from "../../long-option-modal/components";
import { useIsMobile } from "../../shared/hooks";

import { AssetHeader } from "./AssetHeader";
import { AssetChart } from "./AssetChart";
import { PositionsTable } from "./PositionsTable";
import {
  Container,
  AssetChartColumnContainer,
  Content,
} from "./LongOptionContent.styles";

// import { Links } from "./Links";

export const LongOptionContent = () => {
  const isMobile = useIsMobile();

  return (
    <Container>
      <AssetHeader />
      <Content>
        <AssetChartColumnContainer>
          <AssetChart />
          {isMobile ? null : <PositionsTable />}
        </AssetChartColumnContainer>
        <Container>
          <LongOptionModal />
          {isMobile ? <PositionsTable /> : null}
          {/* <Links /> */}
        </Container>
      </Content>
    </Container>
  );
};
