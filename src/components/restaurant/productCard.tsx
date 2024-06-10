import { Plus } from "lucide-react";
import { Large } from "../typography";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";

interface ProductCardProps extends React.HTMLProps<HTMLDivElement> {}

export function ProductCard({
  className,
  children,
  ...props
}: ProductCardProps) {
  return (
    <div className="max-w-[300px] rounded-[20px] bg-white p-6 shadow-md">
      <AspectRatio ratio={1} className="h-full w-full">
        <div className="relative">
          <img src="/src/assets/test/test.webp" alt="restaurant" />
        </div>
      </AspectRatio>

      <div className=" flex gap-3 h-full">
        <div>
          <Large className="py-2">Le pain</Large>
          <p>lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam</p>
        </div>
        <Button size="default" className="shrink-0 h-full flex-1">
          <Plus />
        </Button>
      </div>
    </div>
  );
}
