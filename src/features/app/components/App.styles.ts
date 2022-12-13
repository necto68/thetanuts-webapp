import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import type { AppTheme, Theme } from "../constants/appTheme";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    -webkit-font-smoothing: antialiased;

    background-color: ${({ theme }: Theme<AppTheme>) => theme.bgColor};
  }

  * {
    box-sizing: border-box;
  }

  .web3modal-modal-container {
    font-family: Roboto;
  }

  *::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #FFFFFF;
    border-radius: 2px;
  }
`;
