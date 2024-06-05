import { cn } from "@/lib/utils";
import { Large } from "../typography";
import { Card } from "../ui/card";

interface RestaurantCardProps extends React.HTMLProps<HTMLDivElement> {}

export function RestaurantCard({
  className,
  children,
  ...props
}: RestaurantCardProps) {
  return (
    <Card
      className={cn(
        "bg-transparent shrink-0 border-0 shadow-none lg:w-[300px]",
        className
      )}
      {...props}
    >
      <div className="h-[150px] overflow-hidden rounded-[20px] ">
        <img src="/src/assets/test/test.webp" alt="restaurant" />
      </div>
      <Large className="py-2">{children}</Large>
    </Card>
  );
}
