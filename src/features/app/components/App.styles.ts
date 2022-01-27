import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    background-color: black;
  }

  * {
    box-sizing: border-box;
  }
`;
