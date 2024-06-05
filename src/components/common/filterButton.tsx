import { Pizza } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface FilterButtonProps extends React.HTMLAttributes<HTMLButtonElement> {}

export default function FilterButton({
  children,
  className,
  ...props
}: FilterButtonProps) {
  return (
    <Button size="icon" className={cn("rounded-full h-14 w-14")} {...props}>
      {children}
    </Button>
  );
}
