import styled from "styled-components";

import {
  ButtonIcon,
  ButtonTitle,
} from "../../select-option-button/components/SelectOptionButton.styles";
import { BaseButton } from "../../shared/components";
import { ButtonsContainer } from "../../header/components/HeaderButtons.styles";
import { screens } from "../../shared/constants";
import type { AppTheme, Theme } from "../../app/constants/appTheme";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px 10px 40px;
  background-color: ${({ theme }: Theme<AppTheme>) => theme.bgColor};

  ${screens.md} {
    padding: 10px 15px 10px 30px;
  }
`;

export const HeaderButtonContainer = styled.div`
  display: flex;
  gap: 4px;

  ${ButtonsContainer} {
    gap: 4px;
  }

  ${ButtonTitle} {
    display: none;
  }

  ${screens.md} {
    ${BaseButton} {
      padding: 8px 11px;
      background: transparent;
    }
  }

  ${ButtonIcon} {
    display: none;
  }
`;
