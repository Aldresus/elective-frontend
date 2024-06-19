import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Large, Small } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { MouseEvent } from "react";

export interface HorizontalItemCardProps
  extends React.HTMLProps<HTMLDivElement> {
  imgUrl: string;
  cardTitle: string;
  cardDescription: string;
  cardPrice: number;
  onAddClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  addButton?: boolean;
}

export function HorizontalItemCard({
  className,
  cardDescription,
  cardPrice,
  cardTitle,
  imgUrl,
  onAddClick = () => {},
  addButton = true,
  ...props
}: HorizontalItemCardProps) {
  return (
    <Card
      className={cn(
        "flex shadow-none border-none h-[200px] w-full gap-4",
        className
      )}
      {...props}
    >
      <div className="h-full aspect-square">
        <div className="object-fill h-full">
          <img
            src={imgUrl}
            alt="restaurant"
            className="relative h-full w-full object-cover rounded-l-md aspect-square"
          />
        </div>
      </div>

      <div className="w-full flex justify-between items-end gap-2 p-2">
        <div className="h-full flex flex-col justify-start gap-1">
          <Large>{cardTitle}</Large>
          <Small className="text-ellipsis line-clamp-3">
            {cardDescription}
          </Small>
          <p>{cardPrice} €</p>
        </div>

        {addButton && (
          <Button
            size="icon"
            className="shrink-0"
            onClick={(e: MouseEvent<HTMLButtonElement>) => {
              onAddClick(e);
            }}
          >
            <Plus />
          </Button>
        )}
      </div>
    </Card>
  );
}
