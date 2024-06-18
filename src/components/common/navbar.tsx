import { CircleUser } from "lucide-react";
import Logo from "./logo";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { useAuth } from "@/lib/auth";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {
  isAdress?: boolean;
}

export default function Navbar({
  isAdress = true,
  className,
  ...props
}: NavbarProps) {
  const auth = useAuth();
  return (
    <div
      className={cn(
        "bg-slate-50 flex justify-between items-center h-[50px] py-2 px-6",
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
        {auth.isAuthenticated && (
          <button
            className="bg-slate-200 text-slate-500 hover:bg-slate-300 py-1 px-2 rounded-md"
            onClick={() => auth.logout()}
          >
            Déconnexion
          </button>
        )}
        <CircleUser size={30} />
      </div>
    </div>
  );
}
