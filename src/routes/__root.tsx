import { AuthContext } from "@/hooks/useAuth";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface RouterContext {
  auth: AuthContext;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
