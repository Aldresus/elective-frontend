import { ChevronRight } from "lucide-react";
import Logo from "./logo";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogPortal,
  DialogClose,
} from "../ui/dialog";
import { Large } from "../typography";
import { Route } from "@/routes/_user";
import { useState } from "react";
import { AddressChoiceModal } from "../address/addressChoiceModal";
import { DecodedAccessToken } from "@/entities/login";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  isAdress?: boolean;
  isRestaurateur?: boolean;
}

export default function Navbar({
  isAdress = true,
  className,
  ...props
}: NavbarProps) {
  const [addressModalIsOpen, setAddressModalIsOpen] = useState(false);
  const [user] = useLocalStorage<DecodedAccessToken>("user");
  const auth = useAuth();
  const navigate = Route.useNavigate();
  console.log(auth);

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
        <div></div>
        <Dialog>
          <DialogTrigger>
            <Button variant="link">
              {user?.first_name} {user?.last_name}
              <Avatar>
                <AvatarFallback>{`${user?.first_name.charAt(0)}${user?.last_name.charAt(
                  0
                )}`}</AvatarFallback>
              </Avatar>
            </Button>
          </DialogTrigger>
          <DialogPortal>
            <DialogContent className="flex flex-col items-center justify-center fixed overflow-y-auto">
              <Large>Account information</Large>
              <DialogClose>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-96 flex flex-row justify-between"
                  onClick={() => navigate({ to: "/user" })}
                >
                  <p>Orders</p>
                  <ChevronRight size={24} />
                </Button>
              </DialogClose>
              <DialogClose>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-96 flex flex-row justify-between"
                  //   onClick={() => navigate({ to: `${context.user.id}` })}
                >
                  <p>Refer</p>
                  <ChevronRight size={24} />
                </Button>
              </DialogClose>
              <DialogClose>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-96 flex flex-row justify-between"
                  //   onClick={() => navigate({ to: `${context.user.id}` })}
                >
                  <p>Account settings</p>
                  <ChevronRight size={24} />
                </Button>
              </DialogClose>
              <DialogClose>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-96 flex flex-row justify-between"
                >
                  <p>Others</p>
                  <ChevronRight size={24} />
                </Button>
              </DialogClose>
              {auth.isAuthenticated && (
                <Button
                  type="button"
                  className="mt-4 w-96"
                  variant="destructive"
                  onClick={() => auth.logout()}
                >
                  Déconnexion
                </Button>
              )}
            </DialogContent>
          </DialogPortal>
        </Dialog>
      </div>
    </div>
  );
}
