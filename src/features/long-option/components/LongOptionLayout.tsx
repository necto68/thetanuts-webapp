import { BasicModalStateProvider } from "../../basic-vault-modal/providers/BasicModalStateProvider";
import { BasicModalMutationsProvider } from "../../basic-vault-modal/providers/BasicModalMutationsProvider";
import { LongModalMutationsProvider } from "../../long-vault-modal/providers/LongModalMutationsProvider";

import { LongOptionContent } from "./LongOptionContent";

export const LongOptionLayout = () => (
  <BasicModalStateProvider>
    <BasicModalMutationsProvider>
      <LongModalMutationsProvider>
        <LongOptionContent />
      </LongModalMutationsProvider>
    </BasicModalMutationsProvider>
  </BasicModalStateProvider>
);
