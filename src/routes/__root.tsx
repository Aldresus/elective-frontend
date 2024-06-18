import { AuthContext } from "@/hooks/useAuth";
import { RoleContext } from "@/hooks/useRole";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";

import type { AuthContext } from "@/lib/auth";
import { RoleContext } from "@/lib/role";

interface MyRouterContext {
  auth: AuthContext;
  roleContext: RoleContext;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});
