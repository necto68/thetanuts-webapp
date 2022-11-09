import { useBasicModalConfig } from "../hooks";
import {
  InfoContainer,
  InfoTitle,
  InfoValue,
} from "../../index-vault-modal/components/VaultInfo.styles";

import { VaultStatus } from "./VaultStatus";

export const VaultStatusInfo = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data, isLoading } = basicVaultQuery;
  const {
    expiry = 0,
    isSettled = false,
    isExpired = false,
    isAllowInteractions = false,
  } = data ?? {};

  return (
    <InfoContainer>
      <InfoTitle>Vault Status</InfoTitle>
      <InfoValue isAlignRight>
        <VaultStatus
          expiry={expiry}
          isAllowInteractions={isAllowInteractions}
          isExpired={isExpired}
          isLoading={isLoading}
          isSettled={isSettled}
        />
      </InfoValue>
    </InfoContainer>
  );
};
