import { LongOptionModal } from "../../long-option-modal/components";

import { AssetHeader } from "./AssetHeader";
import { ChartHeader } from "./ChartHeader";
import { Container, Content } from "./LongOptionContent.styles";

export const LongOptionContent = () => (
  <Container>
    <AssetHeader />
    <Content>
      <ChartHeader />
      <LongOptionModal />
    </Content>
  </Container>
);
