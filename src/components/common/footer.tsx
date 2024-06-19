import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { Small } from "../typography";
import { Link } from "@tanstack/react-router";

interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Footer({ className, ...props }: FooterProps) {
  return (
    <div
      className={cn(
        "h-[50px] py-2 px-6 flex items-center justify-between bg-selago-100 shadow-inner",
        className
      )}
      {...props}
    >
      <Small>© 2024 CESIEats</Small>
      <div className="space-x-4">
        <Link to="/privacy">
          <Button variant="link">Vie privée</Button>
        </Link>
        <Link to="/legal">
          <Button variant="link">Mentions légales</Button>
        </Link>
      </div>
    </div>
  );
}
