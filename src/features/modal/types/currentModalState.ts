export interface CurrentModalState {
  modalComponent: (() => JSX.Element) | null;
  handleClose: () => void;
}
