import { Plus } from "lucide-react";
import { Large, Small } from "../typography";
import { AspectRatio } from "../ui/aspect-ratio";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface ProductCardProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  imageUrl: string;
  description?: string;
  price: number;
}

export function ProductCard({
  className,
  title,
  imageUrl,
  children,
  price,
  description,
  ...props
}: ProductCardProps) {
  return (
    <Card
      className="w-[250px] aspect-[2/3] p-2 bg-card shadow-none border-none"
      {...props}
    >
      <div className="h-2/3">
        <AspectRatio ratio={1} className="overflow-hidden h-full">
          <div className="object-fill h-full w-full ">
            <img
              src="/src/assets/test/test.webp"
              alt="restaurant"
              className="relative h-full w-full object-cover rounded-md"
            />
          </div>
        </AspectRatio>
      </div>

      <div className="h-1/3 flex justify-between items-end gap-2">
        <div className="h-full flex flex-col justify-start gap-1">
          <Large>{title}</Large>
          <Small className="text-ellipsis line-clamp-3">{description}</Small>
          <p>{price} €</p>
        </div>

        <Button size="icon" className="shrink-0">
          <Plus />
        </Button>
      </div>
    </Card>
  );
}
