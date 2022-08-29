import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { LiveChatWidget } from "@livechat/widget-react";
import Big from "big.js";

import { Root } from "../../root/components";
import { queryClient } from "../../shared/helpers";
import { liveChatLicense } from "../constants";
import { SidebarStateProvider } from "../../sidebar/providers";

import { GlobalStyle } from "./App.styles";

Big.NE = -20;
Big.PE = 80;

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <GlobalStyle />
      <SidebarStateProvider>
        <Root />
      </SidebarStateProvider>
    </Router>
    <LiveChatWidget license={liveChatLicense} />
    <ReactQueryDevtools />
  </QueryClientProvider>
);
