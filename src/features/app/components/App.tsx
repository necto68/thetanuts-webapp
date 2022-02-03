import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Big from "big.js";

import { Root } from "../../root/components";

import { GlobalStyle } from "./App.styles";

Big.NE = -20;
Big.PE = 80;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Number.POSITIVE_INFINITY,
    },
  },
});

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <Router>
      <GlobalStyle />
      <Root />
    </Router>
    <ReactQueryDevtools />
  </QueryClientProvider>
);
