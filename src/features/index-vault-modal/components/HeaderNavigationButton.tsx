import type { FC } from "react";

import { CircleButtonIconType } from "../../shared/components";
import type { ModalContentType } from "../types";
import { useVaultModalClose, useVaultModalState } from "../../modal/hooks";

import { HeaderNavigationCircleButton } from "./HeaderNavigationButton.styles";

interface HeaderNavigationButtonProps {
  backContentType?: ModalContentType;
}

export const HeaderNavigationButton: FC<HeaderNavigationButtonProps> = ({
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
      primaryColor="#FFFFFF"
    />
  );
};
