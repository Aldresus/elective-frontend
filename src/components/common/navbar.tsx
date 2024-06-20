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
} from "../ui/dialog";
import { Large } from "../typography";
import { Route } from "@/routes/_user";
import { useContext, useState } from "react";
import { AddressChoiceModal } from "../address/addressChoiceModal";
import { DecodedAccessToken } from "@/entities/login";
import { useLocalStorage } from "@uidotdev/usehooks";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "../ui/button";
import { restaurateurContext } from "@/contexts/restaurateurContext";
import { RoleEnum } from "@/entities/user";

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
  const restaurateur = useContext(restaurateurContext);

  return (
    <div
      className={cn(
        "flex justify-between items-center h-[50px] py-2 px-6 z-[49] bg-selago-100 shadow-sm",
        className
      )}
      {...props}
    >
      <Link to="/" className="h-full flex items-center">
        <Logo className="h-2/3 sm:h-full" />
      </Link>
      {isAdress && (
        <AddressChoiceModal
          opened={() => setAddressModalIsOpen(true)}
          open={addressModalIsOpen}
          closed={() => setAddressModalIsOpen(false)}
        />
      )}
      <Input className="w-full max-w-40 sm:max-w-xs" placeholder="Rechercher" />
      <div className="flex items-center gap-2">
        <Dialog>
          <DialogTrigger>
            {auth.isAuthenticated ? (
              <Button variant="link" className="gap-2">
                <div className="hidden sm:block">
                  {user?.first_name} {user?.last_name}
                </div>
                <Avatar>
                  <AvatarFallback>{`${user?.first_name.charAt(0)}${user?.last_name.charAt(
                    0
                  )}`}</AvatarFallback>
                </Avatar>
              </Button>
            ) : (
              <Link to="/login">
                <Button
                  className="w-full flex gap-1 justify-between"
                  variant="default"
                >
                  Se connecter
                </Button>
              </Link>
            )}
          </DialogTrigger>
          <DialogPortal>
            <DialogContent className="flex flex-col items-center justify-center fixed overflow-y-auto">
              <Large>Informations du compte</Large>

              {user.role === RoleEnum.RESTAURATEUR && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex flex-row justify-between"
                  onClick={() => navigate({ to: "/commands" })}
                >
                  Commandes
                  <ChevronRight size={24} />
                </Button>
              )}
              {user.role === RoleEnum.CLIENT && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex flex-row justify-between"
                  onClick={() => navigate({ to: "/delivery/history" })}
                >
                  Commandes
                  <ChevronRight size={24} />
                </Button>
              )}

              {user.role === RoleEnum.RESTAURATEUR && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex flex-row justify-between"
                  onClick={() => navigate({ to: `/offerings` })}
                >
                  Inventaire
                  <ChevronRight size={24} />
                </Button>
              )}

              {user.role === RoleEnum.CLIENT && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex flex-row justify-between"
                  onClick={() => navigate({ to: `/editUser/${user.sub}` })}
                >
                  Parrainage
                  <ChevronRight size={24} />
                </Button>
              )}

              {user.role === RoleEnum.RESTAURATEUR && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex flex-row justify-between"
                  onClick={() =>
                    navigate({
                      to: `/restaurant/edit/${restaurateur.restaurant.id_restaurant}`,
                    })
                  }
                >
                  Paramètres du compte
                  <ChevronRight size={24} />
                </Button>
              )}

              {user.role === RoleEnum.CLIENT && (
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full flex flex-row justify-between"
                  onClick={() => navigate({ to: `/editUser/${user.sub}` })}
                >
                  Paramètres du compte
                  <ChevronRight size={24} />
                </Button>
              )}

              {auth.isAuthenticated && (
                <Button
                  type="button"
                  className="mt-4 w-full"
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
