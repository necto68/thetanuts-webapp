import styled from "styled-components";

import { Container as IndexVaultModalContentContainer } from "../../index-vault-modal/components/ModalContent.styles";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const Container = styled(IndexVaultModalContentContainer)`
  background-color: ${({ theme }: Theme<AppTheme>) => theme.bgColor};
  border: 4px solid ${({ theme }: Theme<AppTheme>) => theme.warningColor};
  box-sizing: content-box;
`;
