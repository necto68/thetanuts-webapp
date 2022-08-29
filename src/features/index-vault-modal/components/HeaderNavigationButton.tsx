import type { FC } from "react";

import { CircleButtonIconType } from "../../shared/components";
import type { ThemeType, ModalContentType } from "../types";
import { useVaultModalClose, useVaultModalState } from "../../modal/hooks";

import { HeaderNavigationCircleButton } from "./HeaderNavigationButton.styles";

interface HeaderNavigationButtonProps extends ThemeType {
  backContentType?: ModalContentType;
}

export const HeaderNavigationButton: FC<HeaderNavigationButtonProps> = ({
  theme = "light",
  backContentType,
}) => {
  const [, setVaultModalState] = useVaultModalState();
  const handleClose = useVaultModalClose();

  const navigationButtonClick = () => {
    if (backContentType) {
      setVaultModalState((previousState) => ({
        ...previousState,
        contentType: backContentType,
      }));
    } else {
      handleClose();
    }
  };

  return (
    <HeaderNavigationCircleButton
      iconSize={12}
      iconType={
        backContentType
          ? CircleButtonIconType.arrowBack
          : CircleButtonIconType.cross
      }
      onClick={navigationButtonClick}
      primaryColor={theme === "dark" ? "#FFFFFF" : "#5D5D5D"}
    />
  );
};
