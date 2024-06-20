import { useRouter } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";

export function NavigationArrows() {
  const { history } = useRouter();

  return (
    <div className="absolute top-15 left-0 z-10 flex items-center justify-center gap-2 p-2">
      <Button
        className="flex items-center justify-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300"
        onClick={() => history?.back()}
      >
        <ChevronLeft />
      </Button>
      <Button
        className="flex items-center justify-center gap-1 rounded-full bg-gray-200 px-2 py-1 text-sm font-medium text-gray-700 hover:bg-gray-300"
        onClick={() => history?.forward()}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
