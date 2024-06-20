import { createFileRoute } from "@tanstack/react-router";
import { H1 } from "@/components/typography";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { UpdateUser } from "@/entities/user";
import { useAuth } from "@/hooks/useAuth";
import UserForm from "@/components/user/userForm";

export const Route = createFileRoute("/_user/editUser/$id")({
  component: EditUser,
});

function EditUser() {
  const { id } = Route.useParams();
  const { token } = useAuth();

  const query = useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const response = await axiosInstance(token as string).get(
        `/user/?id=${id}`
      );
      const finalData = { ...response.data[0] } as UpdateUser;
      console.log("finalData", finalData);
      return finalData;
    },
    // refetchInterval: 1000 * 60, // refresh every minute
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
      </div>
    </>
  );
}
