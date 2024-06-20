import { NavigationArrows } from "@/components/common/navigationArrows";
import { AuthContext } from "@/hooks/useAuth";
import { RoleContext } from "@/hooks/useRole";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

interface MyRouterContext {
  auth: AuthContext;
  roleContext: RoleContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <NavigationArrows />
      <Outlet />
    </>
  ),
});
