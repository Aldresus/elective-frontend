import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { AuthProvider, useAuth } from "./lib/auth";
import { RoleProvider, useRole } from "./lib/role";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
    roleContext: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
}

function InnerApp() {
  const auth = useAuth();
  const roleContext = useRole();
  return <RouterProvider router={router} context={{ auth, roleContext }} />;
}

function App() {
  return (
    <AuthProvider>
      <RoleProvider>
        <InnerApp />
      </RoleProvider>
    </AuthProvider>
  );
}
