import { H1 } from "@/components/typography";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: IndexComponent,
});

function IndexComponent() {
  return (
    <div className="flex flex-col items-center w-full gap-2 min-h-screen bg-hungry-yellow-50">
      <H1>slt ici c lindex</H1>
      <Link className="bg-red-200 p-3 rounded" to="/components">
        et ici les components
      </Link>
      <Link className="bg-red-200 p-3 rounded" to="/user">
        il ya un exemple de nested layout aussi
      </Link>
    </div>
  );
}
