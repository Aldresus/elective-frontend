import { ChevronRight, CircleUser } from "lucide-react";
import Logo from "./logo";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Link, Navigate } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogPortal,
  DialogClose,
} from "../ui/dialog";
import { Large } from "../typography";
import { Route } from "@/routes/_user";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  isAdress?: boolean;
}

export default function Navbar({
  isAdress = true,
  className,
  ...props
}: NavbarProps) {
  const auth = useAuth();
  const navigate = Route.useNavigate();

  return (
    <div
      className={cn(
        "bg-slate-50 flex justify-around items-center h-[50px] py-2 px-6",
        className
      )}
      {...props}
    >
      <Link to="/" className="h-full">
        <Logo />
      </Link>
      {isAdress && <div>l'adresse tmtc V</div>}
      <Input className="w-full max-w-xs" placeholder="Rechercher" />
      <div className="flex items-center gap-2">
        <Large>user.name</Large>
        <Dialog>
          <DialogTrigger>
            <Button type="button" variant="ghost">
              <CircleUser size={30} />
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
                  onClick={() => navigate({ to: "/editProfile" })}
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
                  onClick={() => navigate({ to: "/editProfile" })}
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
                  onClick={() => navigate({ to: "/editProfile" })}
                >
                  <p>Others</p>
                  <ChevronRight size={24} />
                </Button>
              </DialogClose>
              {auth.isAuthenticated && (
                <Button
                  type="button"
                  className="mt-4 w-96"
                  variant="link"
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
    // </div>
  );
}
