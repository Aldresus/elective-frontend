import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { H2 } from "../typography";
import { isProduct } from "@/entities/categoryContent";
import { VerticalProductCard } from "./verticalProductCard";

interface ProductCarrouselProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  content: Array<Product | Menu>;
}

export function ProductCarrousel({
  title,
  content,
  ...props
}: ProductCarrouselProps) {
  return (
    <div className="overflow-hidden h-full w-full">
      <H2>{title}</H2>
      <div className="flex gap-3 overflow-x-scroll w-full whitespace-nowrap">
        {content.map((item) => {
          if (isProduct(item)) {
            return (
              <VerticalProductCard
                className="shrink-0"
                key={item.id_product}
                title={item.name}
                imageUrl={item.product_image_url}
                description={item.description}
                price={item.price}
              />
            );
          }
          return (
            <VerticalProductCard
              className="shrink-0"
              key={item.id_menu}
              title={item.name}
              imageUrl={item.menu_image_url}
              description={item.description}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
}
