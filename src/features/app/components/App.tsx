import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LiveChatWidget } from "@livechat/widget-react";
import Big from "big.js";
import { ThemeProvider } from "styled-components";

import { Root } from "../../root/components";
import { queryClient } from "../../shared/helpers";
import { liveChatLicense } from "../constants";
import { SidebarStateProvider } from "../../sidebar/providers";
import { DarkAppTheme } from "../constants/appTheme";

import { GlobalStyle } from "./App.styles";

Big.NE = -20;
Big.PE = 80;

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <ThemeProvider theme={DarkAppTheme}>
        <GlobalStyle />
        <SidebarStateProvider>
          <Root />
        </SidebarStateProvider>
      </ThemeProvider>
    </Router>
    <LiveChatWidget license={liveChatLicense} />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
