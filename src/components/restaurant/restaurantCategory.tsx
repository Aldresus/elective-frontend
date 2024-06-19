import type { Product } from "@/entities/product";
import { H2 } from "../typography";
import { isProduct } from "@/entities/categoryContent";
import { Menu } from "@/entities/menu";
import { HorizontalProductCard } from "./product/horizontalProductCard";
import { HorizontalMenuCard } from "./menu/horizontalMenuCard";

interface RestaurantCategoryProps extends React.HTMLProps<HTMLDivElement> {
  categoryName: string;
  categoryItems: Array<Product | Menu>;
}

export function RestaurantCategory({
  categoryName,
  categoryItems,
  className,
  ...props
}: RestaurantCategoryProps) {
  return (
    <div className={className} {...props}>
      <H2>{categoryName}</H2>
      <div className="grid grid-cols-2 gap-3">
        {categoryItems.map((item) => {
          if (isProduct(item)) {
            return (
              <HorizontalProductCard key={item.id_product} product={item} />
            );
          }
          return <HorizontalMenuCard key={item.id_menu} menuContent={item} />;
        })}
      </div>
    </div>
  );
}
