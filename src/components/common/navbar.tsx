import { CircleUser } from "lucide-react";
import Logo from "./logo";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { ModalContext } from "../restaurant/modalContext";
import { AddressChoiceModal } from "../user/addressChoiceModal";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  isAdress?: boolean;
  isRestaurateur?: boolean;
}

export default function Navbar({
  isAdress = true,
  isRestaurateur = false,
  className,
  ...props
}: NavbarProps) {
  const { modalIsOpen, setmodalIsOpen } = useContext(ModalContext);
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);
  return (
    <div
      className={cn(
        "bg-slate-50 flex justify-between items-center h-[50px] py-2 px-6 z-[49]",
        className
      )}
      {...props}
    >
      <Link to="/" className="h-full">
        <Logo />
      </Link>
      {isAdress && (
        <AddressChoiceModal
          opened={() => setAddressModalIsOpen(true)}
          open={addressModalIsOpen}
          closed={() => setAddressModalIsOpen(false)}
          currentAddress="adresse test" //needs to come from the context
        />
      )}
      <Input className="w-full max-w-xs" placeholder="Rechercher" />
      <div className="flex items-center gap-2">
        jsp qui est ce texte
        {isRestaurateur && (
          <CircleUser size={30} onClick={() => setmodalIsOpen(true)} />
        )}
        {!isRestaurateur && <CircleUser size={30} />}
      </div>
    </div>
  );
}
