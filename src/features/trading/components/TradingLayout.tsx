import { TradingModal } from "../../trading-modal/components";

import { AssetHeader } from "./AssetHeader";
import { ChartHeader } from "./ChartHeader";
import { Container, Content } from "./TradingLayout.styles";

export const TradingLayout = () => (
  <Container>
    <AssetHeader />
    <Content>
      <ChartHeader />
      <TradingModal />
    </Content>
  </Container>
);
