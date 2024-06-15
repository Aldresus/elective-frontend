import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { H2 } from "../typography";
import { isProduct } from "@/entities/categoryContent";
import { VerticalProductCard } from "./verticalProductCard";
import { cn } from "@/lib/utils";

interface ProductCarrouselProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  content: Array<Product | Menu>;
}

export function ProductCarrousel({
  title,
  content,
  className,
  ...props
}: ProductCarrouselProps) {
  return (
    <div className={cn("overflow-hidden h-full w-full", className)} {...props}>
      <H2>{title}</H2>
      <div className="flex gap-3 overflow-x-scroll w-full whitespace-nowrap">
        {content.map((item) => {
          if (isProduct(item)) {
            return (
              <VerticalProductCard
                className="shrink-0"
                key={`product_${item.id_product}`}
                content={item}
              />
            );
          }
          return (
            <VerticalProductCard
              className="shrink-0"
              key={`menu_${item.id_menu}`}
              content={item}
            />
          );
        })}
      </div>
    </div>
  );
}
