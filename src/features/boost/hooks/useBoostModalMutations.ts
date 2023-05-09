import { useContext } from "react";

import { BoostModalMutationsContext } from "../providers/BoostModalMutationsProvider";

export const useBoostModalMutations = () =>
  useContext(BoostModalMutationsContext);
