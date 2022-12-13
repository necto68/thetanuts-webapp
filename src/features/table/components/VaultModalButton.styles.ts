import styled from "styled-components";

import { BaseButton } from "../../shared/components";

export const BaseVaultModalButton = styled(BaseButton)`
  font-family: Roboto;
  font-weight: 500;
  font-size: 12px;
  padding: 12px 26px;
  min-width: 105px;

  border-radius: 8px;

  color: white;
`;

export const DemoVaultModalButton = styled(BaseVaultModalButton)`
  max-width: 105px;
  white-space: nowrap;
  display: flex;
  justify-content: center;
`;
