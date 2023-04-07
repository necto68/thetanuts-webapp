import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import { memo } from "react";

import type { ChartProps } from "../types/Chart";

import { Container } from "./Chart.styles";

const Chart = memo(({ chartSymbol }: ChartProps) => (
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
));

Chart.displayName = "Chart";

export { Chart };
