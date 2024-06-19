import { H1 } from "@/components/typography";
// import { DecodedAccessToken } from "@/entities/login";
// import { User } from "@/entities/user";
// import { axiosInstance } from "@/lib/axiosConfig";
// import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
// import { useLocalStorage } from "@uidotdev/usehooks";

export const Route = createFileRoute("/_user/user/$id")({
  component: AccountPage,
});

function AccountPage() {
  //   const [decodedAccessToken] = useLocalStorage<DecodedAccessToken>("user");
  const { id } = Route.useParams();

  //   const query = useQuery({
  //     queryKey: ["user", id],
  //     queryFn: async () => {
  //       const response = await axiosInstance.get(`/user/${id}`);
  //       const finalData = response.data as User;

  //       console.log(finalData);

  //       return finalData;
  //     },
  //     refetchInterval: 1000 * 60, // refresh every minute
  //   });

  //   const currentUser = useContext(userContext);

  //   useEffect(() => {
  // console.log("useEffect", currentUser);
  // console.log(
  //   "useEffect",
  //   id,
  //   currentUser.id_user,
  //   id !== currentUser.id_user
  // );

  //     if (decodedAccessToken) {
  //       currentUser.setUserId(decodedAccessToken.sub);
  //     }
  //   }, [currentUser, decodedAccessToken, id]);

  return (
    <div className="space-y-6 w-full">
      <H1 className="text-center">{id}</H1>
    </div>
  );
}
