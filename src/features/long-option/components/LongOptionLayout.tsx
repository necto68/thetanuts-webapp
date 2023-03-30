import { LongOptionModal } from "../../long-option-modal/components";

import { AssetHeader } from "./AssetHeader";
import { ChartHeader } from "./ChartHeader";
import { Container, Content } from "./LongOptionLayout.styles";

export const LongOptionLayout = () => (
  <Container>
    <AssetHeader />
    <Content>
      <ChartHeader />
      <LongOptionModal />
    </Content>
  </Container>
);
