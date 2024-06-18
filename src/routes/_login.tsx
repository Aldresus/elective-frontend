import Footer from "@/components/common/footer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_login")({
  component: LoginLayout,
});

function LoginLayout() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="bg-yellow-500 min-h-screen w-[500px] mx-auto flex items-center justify-center">
        <div className="bg-red-50 p-9 w-full ">
          <Outlet />
        </div>
        <Footer className="absolute bottom-0 left-0 w-full" />
      </div>
    </QueryClientProvider>
  );
}
