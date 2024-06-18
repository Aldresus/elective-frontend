import { H1 } from "@/components/typography";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/editProfile")({
  component: Profile,
});

export function Profile() {
  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="w-full flex justify-start gap-9">
        <H1>Paramètres du compte</H1>
      </div>
      <div className="flex flex-col gap-6">
        <Separator />
      </div>
    </div>
  );
}
