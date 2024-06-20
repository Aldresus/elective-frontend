import { createFileRoute } from "@tanstack/react-router";
import { H1 } from "@/components/typography";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { UpdateUser } from "@/entities/user";
import { useAuth } from "@/hooks/useAuth";
import UserForm from "@/components/user/userForm";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@uidotdev/usehooks";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

export const Route = createFileRoute("/_user/editUser/$id")({
  component: EditUser,
});

function EditUser() {
  const { token } = useAuth();
  const [showCode, setShowCode] = useState(false);
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);
  const { id } = Route.useParams();

  const query = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axiosInstance(token as string).get(
        `/user/?id=${id}`
      );
      const finalData = { ...response.data[0] } as UpdateUser;
      return finalData;
    },
  });

  return (
    <>
      <div className="space-y-6 w-full">
        <H1 className="text-center">Votre compte</H1>
      </div>
      <div className="h-full w-full">
        <UserForm
          defaultValues={query.data as UpdateUser}
          onSubmit={async (values) => {
            axiosInstance(token as string)
              .patch(`user/${id}`, {
                ...values,
              })
              .then((res) => {
                console.log("Insertion réussie");
                console.log(res);
              })
              .catch((err) => {
                console.log("Failed");
                console.log(err);
              });
          }}
        />
        <Separator className="w-full mt-8" />
        <div className="flex flex-col space-y-2 mt-6">
          <div className="flex items-center space-x-2">
            <div className="flex flex-row gap-2 min-w-[500px] items-center">
              Code de parrainage:
              {showCode ? (
                <div className="flex flex-row items-center bg-slate-200 rounded gap-2">
                  <span className="font-bold bg-slate-100 p-2 rounded-l">
                    {id}
                  </span>
                  {hasCopiedText ? (
                    <Check
                      className="cursor-pointer mr-2"
                      onClick={() => copyToClipboard(id)}
                    />
                  ) : (
                    <Copy
                      className="cursor-pointer mr-2"
                      onClick={() => {
                        copyToClipboard(id);
                        toast.info("copié dans le presse papier");
                      }}
                    />
                  )}
                </div>
              ) : (
                <span className="font-bold">************</span>
              )}
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowCode(!showCode)}
              className="w-[200px]"
            >
              Voir le code de parrainage
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
