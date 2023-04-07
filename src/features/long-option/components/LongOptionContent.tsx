import { LongOptionModal } from "../../long-option-modal/components";

import { AssetHeader } from "./AssetHeader";
import { AssetChart } from "./AssetChart";
import { Container, Content } from "./LongOptionContent.styles";
import { Links } from "./Links";

export const LongOptionContent = () => (
  <Container>
    <AssetHeader />
    <Content>
      <AssetChart />
      <Container>
        <LongOptionModal />
        <Links />
      </Container>
    </Content>
  </Container>
);
