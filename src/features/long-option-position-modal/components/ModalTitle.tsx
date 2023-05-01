import { Separator } from "../../long-option-modal/components/LongOptionModal.styles";
import { useBasicModalConfig } from "../../basic-vault-modal/hooks";
import { useVaultModalState } from "../../modal/hooks";
import { ModalContentType } from "../../index-vault-modal/types";

import { Container, Title } from "./ModalTitle.styles";

export const ModalTitle = () => {
  const [{ contentType }] = useVaultModalState();
  const { basicVaultQuery } = useBasicModalConfig();
  const { data } = basicVaultQuery;

  const { assetSymbol = "" } = data ?? {};

  const title =
    contentType === ModalContentType.openLongOptionPosition
      ? `Confirm Open Long ${assetSymbol} Position`
      : `Confirm Close Long ${assetSymbol} Position`;

  return (
    <Container>
      <Title>{title}</Title>
      <Separator />
    </Container>
  );
};
