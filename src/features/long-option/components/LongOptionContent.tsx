import { LongOptionModal } from "../../long-option-modal/components";

import { AssetHeader } from "./AssetHeader";
import { AssetChart } from "./AssetChart";
import { Container, Content } from "./LongOptionContent.styles";

export const LongOptionContent = () => (
  <Container>
    <AssetHeader />
    <Content>
      <AssetChart />
      <LongOptionModal />
    </Content>
  </Container>
);
