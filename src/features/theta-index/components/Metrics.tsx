import { useMetrics } from "../hooks";
import { MetricsContainer, Metric } from "../../header/components";
import { totalValueLockedFormatter } from "../../shared/helpers";

export const Metrics = () => {
  const { data, isLoading } = useMetrics();
  const { tvl = 0, notionalSold = 0, premiumEarned = 0 } = data ?? {};

  const formattedTVL = totalValueLockedFormatter(tvl);
  const formattedNotionalSold = totalValueLockedFormatter(notionalSold);
  const formattedPremiumEarned = totalValueLockedFormatter(premiumEarned);

  return (
    <MetricsContainer>
      <Metric isLoading={isLoading} title="TVL" value={formattedTVL} />
      <Metric
        isLoading={isLoading}
        title="Notional Sold"
        value={formattedNotionalSold}
      />
      <Metric
        isLoading={isLoading}
        title="Premium Earned"
        value={formattedPremiumEarned}
      />
    </MetricsContainer>
  );
};
