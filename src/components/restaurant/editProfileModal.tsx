import ReactModal from "react-modal";
import { H1 } from "../typography";
import { useContext } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import { ProfilePageSelector } from "./profilePageSelector";
import { ModalContext } from "./modalContext";

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
          <ProfilePageSelector
            text={"Commandes"}
            pageLink={"path/to/orderpage"}
          />
          <ProfilePageSelector
            text={"Parrainage"}
            pageLink={"path/to/orderpage"}
          />
          <ProfilePageSelector
            text={"Réglage Restaurant"}
            pageLink={"path/to/orderpage"}
          />
          <ProfilePageSelector text={"Autre"} pageLink={"path/to/orderpage"} />
        </div>
      </div>
    </ReactModal>
  );
}
