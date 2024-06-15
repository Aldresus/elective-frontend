import type { Product } from "@/entities/product";
import { H2 } from "../typography";
import { VerticalProductCard } from "./verticalProductCard";
import { isProduct, type CategoryContent } from "@/entities/categoryContent";
import { Menu } from "@/entities/menu";
import { HorizontalProductCard } from "./horizontalProductCard";

interface RestaurantCategoryProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  content: Array<Product | Menu>;
  orientation?: "horizontal" | "vertical";
}

export function RestaurantCategory({
  title,
  orientation = "horizontal",
  content,
  className,
}: RestaurantCategoryProps) {
  const ProductCard =
    orientation === "horizontal" ? HorizontalProductCard : VerticalProductCard;

  return (
    <div>
      <H2>{title}</H2>
      <div className="grid grid-cols-2 gap-3">
        {content.map((item) => {
          if (isProduct(item)) {
            return <ProductCard key={item.id_product} content={item} />;
          }
          return <ProductCard key={item.id_menu} content={item} />;
        })}
      </div>
    </div>
  );
}
