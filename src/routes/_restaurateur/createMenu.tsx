import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_restaurateur/createMenu")({
  component: () => <div>I should exist</div>,
});
