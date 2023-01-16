import { VaultType } from "../../basic-vault/types";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";

import { TypeTitle } from "./TypeTitle";
import { Container } from "./Header.styles";

export const Header = () => {
  const { basicVaultQuery } = useBasicModalConfig();
  const { data } = basicVaultQuery;
  const { type } = data ?? {};

  const isCall = type === VaultType.CALL;
  const isPut = type === VaultType.PUT;

  return (
    <Container>
      <TypeTitle isActive={isCall} type={VaultType.CALL} />
      <TypeTitle isActive={isPut} type={VaultType.PUT} />
    </Container>
  );
};
