import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import { screens } from "../../shared/constants";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    -webkit-font-smoothing: antialiased;

    background-color: #031a34;

    ${screens.md} {
      background-color: #000000;
    }
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
