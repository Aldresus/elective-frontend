import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/order/$id")({
  component: () => <div>Hello /_user/order/$id!</div>,
});
