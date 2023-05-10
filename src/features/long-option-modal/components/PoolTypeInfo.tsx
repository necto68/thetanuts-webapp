import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { getVaultTypeStrategy } from "../../index-vault/helpers";
import { VaultType } from "../../basic-vault/types";
import { periodFormatter } from "../../shared/helpers";

import { InfoContainer, InfoTitle, InfoValue } from "./OrderInfo.styles";

export const PoolTypeInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();

  const { data, isLoading } = basicVaultQuery;
  const { type = VaultType.CALL, assetSymbol = "", period = 0 } = data ?? {};

  const formattedPeriod = periodFormatter(period);
  const vaultTypeStrategy = getVaultTypeStrategy(type);

  const loadingPlaceholder = ".....";

  return (
    <InfoContainer>
      <InfoTitle>Pool Type</InfoTitle>
      <InfoValue>
        {isLoading
          ? loadingPlaceholder
          : `10D ${formattedPeriod} ${assetSymbol} ${vaultTypeStrategy}`}
      </InfoValue>
    </InfoContainer>
  );
};
