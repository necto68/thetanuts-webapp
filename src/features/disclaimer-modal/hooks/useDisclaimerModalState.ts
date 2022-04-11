import { useLocalstorageState } from "rooks";

export const useDisclaimerModalState = () =>
  useLocalstorageState("disclaimerModalState", { isShow: true });
