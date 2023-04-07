import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import type { FC } from "react";

import type { ChartProps } from "../types/Chart";

import { Container } from "./Chart.styles";

export const Chart: FC<ChartProps> = ({ chartSymbol }) => (
  <Container>
    <AdvancedRealTimeChart
      allow_symbol_change={false}
      autosize
      calendar={false}
      disabled_features={[
        "header_compare",
        "create_volume_indicator_by_default",
      ]}
      hide_side_toolbar
      interval="1"
      save_image={false}
      symbol={chartSymbol}
      theme="dark"
      withdateranges={false}
    />
  </Container>
);
