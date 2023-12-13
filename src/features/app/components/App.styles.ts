import styled, { createGlobalStyle } from "styled-components";
import { normalize } from "styled-normalize";

import type { AppTheme, Theme } from "../constants/appTheme";

export const GlobalStyle = createGlobalStyle`
  ${normalize}

  body {
    -webkit-font-smoothing: antialiased;

    background-color: ${({ theme }: Theme<AppTheme>) => theme.bgColor};

    overflow-x:auto;
    overflow-y:auto;
  }

  * {
    box-sizing: border-box;
  }

  .web3modal-modal-container {
    font-family: Roboto;
  }

  *::-webkit-scrollbar {
    width: 0px;
    height: 2px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #FFFFFF;
    border-radius: 2px;
  }

  .web3modal-modal-card {
    display: flex;
    flex-direction: column;
    max-width: 400px;
  }
`;

export const BannerContainer = styled.div`
  height: 44px;
  background-color: #000; /* Change the background color as desired */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white; /* Change the text color as desired */
`;

export const BannerText = styled.div`
  font-size: 0.875rem; /* Change the font size as desired */
  display: flex;
  font-family: Roboto;
`;

export const BannerLink = styled.a`
  color: #1fffab; /* Change the link color as desired */
  text-decoration: underline; /* Add underline to links */
  margin-left: 5px; /* Adjust spacing as needed */
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
`;
