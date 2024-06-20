import Footer from "@/components/common/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_login")({
  beforeLoad: async ({ context }) => {
    console.log("beforeLoad", context);

    // if (context.auth.isAuthenticated) {
    //   throw redirect({
    //     to: "/user",
    //     search: {
    //       redirect: location.href,
    //     },
    //   });
    // }
  },
  component: LoginLayout,
});

function LoginLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen sm:w-[500px] mx-auto flex items-center justify-center">
        <div className="p-9 w-full ">
          <Outlet />
        </div>
        <Footer className="absolute bottom-0 left-0 w-full" />
      </div>
    </QueryClientProvider>
  );
}
