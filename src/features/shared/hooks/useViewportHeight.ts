import { use100vh } from "react-div-100vh";

export const useViewportHeight = (multiplier = 1): string => {
  const viewportHeight = use100vh();

  return viewportHeight
    ? `${multiplier * viewportHeight}px`
    : `${multiplier * 100}vh`;
};
