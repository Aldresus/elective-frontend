import { X } from "lucide-react";
import { Card } from "../ui/card";
import { LoginCard } from "./loginCard";
import { Large } from "../typography";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { Role } from "@/entities/user";
import { useRole } from "@/lib/role";

interface LoginBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onclose?: () => void;
}
export function LoginBanner({ onclose, ...props }: LoginBannerProps) {
  const role = useRole();
  return (
    <Card className="bg-hungry-yellow-200 p-4 rounded-lg" {...props}>
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="text-sm"
          onClick={() => onclose?.()}
        >
          <X />
        </Button>
      </div>
      <div className="flex justify-around mb-10">
        <Link to="/signup" onClick={() => role.setRole(Role.RESTAURATEUR)}>
          <LoginCard>
            <Large className="pt-2">
              Vous êtes un <b>livreur</b> ?
            </Large>
          </LoginCard>
        </Link>
        <Link to="/signup" onClick={() => role.setRole(Role.RESTAURATEUR)}>
          <LoginCard>
            <Large>
              Vous êtes un <b>restaurateur</b> ?
            </Large>
          </LoginCard>
        </Link>
      </div>
    </Card>
  );
}
