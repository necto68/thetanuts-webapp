import styled from "styled-components";

import {
  ButtonIcon,
  ButtonTitle,
} from "../../select-option-button/components/SelectOptionButton.styles";
import { BaseButton } from "../../shared/components";
import { ButtonsContainer } from "../../header/components/HeaderButtons.styles";
import { screens } from "../../shared/constants";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: rgba(0, 0, 0, 0.8);
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
