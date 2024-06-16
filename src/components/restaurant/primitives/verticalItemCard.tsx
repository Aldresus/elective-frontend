import { Card } from "@/components/ui/card";
import { Large, Small } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { MouseEvent } from "react";

export interface VerticalItemCardProps extends React.HTMLProps<HTMLDivElement> {
  imgUrl: string;
  cardTitle: string;
  cardDescription: string;
  cardPrice: number;
  onAddClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export function VerticalItemCard({
  className,
  imgUrl,
  cardTitle,
  cardDescription,
  cardPrice,
  onAddClick = () => {},
  ...props
}: VerticalItemCardProps) {
  return (
    <Card
      className={cn(
        "w-[200px] aspect-[5/8] bg-card shadow-none border-none cursor-pointer",
        className
      )}
      {...props}
    >
      <div className="w-full aspect-square">
        <div className="object-fill h-full w-full ">
          <img
            src={imgUrl}
            alt="restaurant"
            className="relative h-full w-full object-cover rounded-t-md"
          />
        </div>
      </div>

      <div className="h-1/3 flex justify-between items-end gap-2 px-2 pt-1">
        <div className="w-3/4 h-full flex flex-col justify-start gap-1">
          <Large className="truncate">{cardTitle}</Large>
          <Small className="text-ellipsis line-clamp-3 text-wrap">
            {cardDescription}
          </Small>
          <p>{cardPrice} €</p>
        </div>

        <Button
          size="icon"
          className="shrink-0"
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            onAddClick(e);
          }}
        >
          <Plus />
        </Button>
      </div>
    </Card>
  );
}
