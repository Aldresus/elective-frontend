import { LogsTable } from "@/components/logs/logsTable";
import { H1 } from "@/components/typography";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_logs/logs")({
  component: Logs,
  beforeLoad: async ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});

function Logs() {
  return (
    <div className="space-y-4">
      <H1>Logs</H1>
      <LogsTable />
    </div>
  );
}

export default Logs;
