import { useGlobalState } from "../../shared/hooks";

export const useIndexVaultModalState = () =>
  useGlobalState("indexVaultModalState");
