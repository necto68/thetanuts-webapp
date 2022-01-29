import { useGlobalState } from "../../shared/hooks";

export const useModalState = () => useGlobalState("modalState");
