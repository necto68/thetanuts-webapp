import { Chart } from "../../chart/components";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { longVaultsMap } from "../../basic/constants";

import { Container } from "./AssetChart.styles";

export const AssetChart = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data } = basicVaultQuery;
  const { id = "" } = data ?? {};

  const { chartSymbol = "" } = longVaultsMap[id] ?? {};

  return (
    <Container>
      <Chart chartSymbol={chartSymbol} />
    </Container>
  );
};
