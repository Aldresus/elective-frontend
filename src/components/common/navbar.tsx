import { CircleUser } from "lucide-react";
import Logo from "./logo";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface NavbarProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Navbar({ className, ...props }: NavbarProps) {
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
      <div>l'adresse tmtc V</div>
      <Input className="w-full max-w-xs" placeholder="Rechercher" />
      <div className="flex items-center gap-2">
        jsp qui est ce texte
        <CircleUser size={30} />
      </div>
    </div>
  );
}
