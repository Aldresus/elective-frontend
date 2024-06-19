import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { H2 } from "../typography";
import { isProduct } from "@/entities/categoryContent";
import { VerticalProductCard } from "./product/verticalProductCard";
import { cn } from "@/lib/utils";
import { VerticalMenuCard } from "./menu/verticalMenuCard";

interface ItemCarrouselProps extends React.HTMLProps<HTMLDivElement> {
  categoryName: string;
  carouselItems: Array<Product | Menu>;
}

export function ItemCarrousel({
  categoryName,
  carouselItems,
  className,
  ...props
}: ItemCarrouselProps) {
  return (
    <div className={cn("overflow-hidden h-full w-full", className)} {...props}>
      <H2>{categoryName}</H2>
      <div className="flex gap-3 overflow-x-auto w-full whitespace-nowrap">
        {carouselItems.map((item) => {
          if (isProduct(item)) {
            return (
              <VerticalProductCard
                className="shrink-0"
                key={`product_${item.id_product}`}
                product={item}
              />
            );
          }
          return (
            <VerticalMenuCard
              className="shrink-0"
              key={`menu_${item.id_menu}`}
              menuContent={item}
            />
          );
        })}
      </div>
    </div>
  );
}
