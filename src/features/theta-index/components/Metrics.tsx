import { useMetrics } from "../hooks";
import { MetricsContainer, Metric } from "../../header/components";
import { currencyFormatter } from "../../shared/helpers";

export const Metrics = () => {
  const { data, isLoading } = useMetrics();
  const { tvl = 0, notionalSold = 0, premiumEarned = 0 } = data ?? {};

  const formattedTVL = currencyFormatter.format(tvl);
  const formattedNotionalSold = currencyFormatter.format(notionalSold);
  const formattedPremiumEarned = currencyFormatter.format(premiumEarned);

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
