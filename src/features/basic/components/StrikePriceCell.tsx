import type { FC } from "react";

import { getFormattedStrikePrices } from "../../basic-vault-modal/helpers";
import type { BasicVault } from "../../basic-vault/types";
import { getVaultStatus } from "../../degen-vault-modal/helpers/utils";
import { VaultStatus } from "../../degen-vault-modal/types/VaultStatus";

import { TitlesContainer } from "./BasicVaultAssetCell.styles";
import { Title } from "./StrikePriceCell.styles";

type StrikePriceProps = Pick<
  BasicVault,
  "isAllowInteractions" | "isExpired" | "isSettled" | "strikePrices" | "type"
>;

export const StrikePriceCell: FC<StrikePriceProps> = ({
  type,
  strikePrices,
  isSettled,
  isExpired,
  isAllowInteractions,
}) => {
  const formattedStrikePrices = getFormattedStrikePrices(type, strikePrices);

  const vaultStatus = getVaultStatus(isSettled, isExpired, isAllowInteractions);

  return (
    <TitlesContainer>
      <Title>
        {vaultStatus === VaultStatus.ActiveEpoch ? formattedStrikePrices : "-"}
      </Title>
    </TitlesContainer>
  );
};
