import ReactModal from "react-modal";
import { H1 } from "../typography";
import { useContext } from "react";
import { Button } from "../ui/button";
import { ChevronRight, X } from "lucide-react";
import { ModalContext } from "./modalContext";
import { Link } from "@tanstack/react-router";

export function EditProfileModal() {
  const { modalIsOpen, setmodalIsOpen } = useContext(ModalContext);

  function closeModal() {
    console.log;
    setmodalIsOpen(false);
  }
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="QR code scanner"
      ariaHideApp={false}
    >
      <div className="w-full">
        <div className="w-full flex items-center justify-between">
          <H1>Information du compte</H1>
          <Button variant="ghost" onClick={closeModal}>
            <X />
          </Button>
        </div>
        <div className="w-full flex flex-col gap-2 pt-4">
          <Link to="/commandMonitoring">
            <Button
              className="w-full flex gap-1 justify-between"
              variant="outline"
              onClick={closeModal}
            >
              Commandes
              <ChevronRight />
            </Button>
          </Link>
          <Link to="/">
            <Button
              className="w-full flex gap-1 justify-between"
              variant="outline"
              onClick={closeModal}
            >
              Parrainage
              <ChevronRight />
            </Button>
          </Link>
          <Link to="">
            {
              // todo get id restaurant dynamikly
            }
            <Button
              className="w-full flex gap-1 justify-between"
              variant="outline"
              onClick={closeModal}
            >
              Réglage Restaurant
              <ChevronRight />
            </Button>
          </Link>
          <Link to="/">
            <Button
              className="w-full flex gap-1 justify-between"
              variant="outline"
              onClick={closeModal}
            >
              Autre
              <ChevronRight />
            </Button>
          </Link>
        </div>
      </div>
    </ReactModal>
  );
}
