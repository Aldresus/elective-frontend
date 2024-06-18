import { Dispatch, SetStateAction, createContext } from "react";

interface ModalContextType {
  modalIsOpen: boolean;
  setmodalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextType>({
  modalIsOpen: false,
  setmodalIsOpen: () => {},
});
