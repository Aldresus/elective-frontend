import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_restaurateur/menu/new")({
  component: () => <div>I should exist</div>,
});
