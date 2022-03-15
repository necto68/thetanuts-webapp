import { SwapRouterStateProvider } from "../providers/SwapRouterStateProvider";
import { SwapRouterMutationsProvider } from "../providers/SwapRouterMutationsProvider";

import { ModalContent } from "./ModalContent";

export const IndexVaultModal = () => (
  <SwapRouterStateProvider>
    <SwapRouterMutationsProvider>
      <ModalContent />
    </SwapRouterMutationsProvider>
  </SwapRouterStateProvider>
);
