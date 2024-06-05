import { X } from "lucide-react";
import { Card, CardContent, CardTitle } from "../ui/card";
import { LoginCard } from "./loginCard";
import { Large } from "../typography";
import { Button } from "../ui/button";

interface LoginBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  onclose?: () => void;
}

export function LoginBanner({ onclose, ...props }: LoginBannerProps) {
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
        <LoginCard className="">
          <Large className="pt-2">
            Vous êtes un <b>livreur</b> ?
          </Large>
        </LoginCard>
        <LoginCard>
          <Large>
            Vous êtes un <b>restauratateur</b> ?
          </Large>
        </LoginCard>
      </div>
    </Card>
  );
}
