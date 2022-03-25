import { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import { sizes } from "../../shared/constants";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    -webkit-font-smoothing: antialiased;

    background-color: #031a34;

    @media (max-width: ${sizes.md}px) {
      background-color: #000000;
    }
  }

  * {
    box-sizing: border-box;
  }

  .web3modal-modal-container {
    font-family: Roboto;
  } 
`;
