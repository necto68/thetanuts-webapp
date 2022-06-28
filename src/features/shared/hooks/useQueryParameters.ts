import React from "react";
import { useLocation } from "react-router-dom";

export const useQueryParameters = (): URLSearchParams => {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
};
