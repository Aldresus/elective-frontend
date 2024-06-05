import { CircleUser } from "lucide-react";
import Logo from "./logo";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Footer({ className, ...props }: FooterProps) {
  return (
    <div
      className={cn(
        "bg-slate-50 flex justify-between items-center h-[50px] py-2 px-6",
        className
      )}
      {...props}
    >
      J'adore le foot
    </div>
  );
}
