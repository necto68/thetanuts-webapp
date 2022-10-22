import { useContext } from "react";

import { LendingMarketModalMutationsContext } from "../providers/LendingMarketModalMutationsProvider";

export const useLendingMarketModalMutations = () =>
  useContext(LendingMarketModalMutationsContext);
