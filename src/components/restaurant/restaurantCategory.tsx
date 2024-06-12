import { Product } from "@/entities/product";
import { H2 } from "../typography";
import { ProductCard } from "./productCard";
import { isProduct, type CategoryContent } from "@/entities/categoryContent";
import { Menu } from "@/entities/menu";

interface RestaurantCategoryProps extends React.HTMLProps<HTMLDivElement> {
  content: Array<Product | Menu>;
}

export function RestaurantCategory({
  title,
  content,
  className,
}: RestaurantCategoryProps) {
  return (
    <div>
      <H2>{title}</H2>
      <div className="flex gap-3">
        {content.map((item) => {
          if (isProduct(item)) {
            return (
              <ProductCard
                key={item.id_product}
                title={item.name}
                imageUrl={item.product_image_url}
                description={item.description}
                price={item.price}
              />
            );
          }
          return (
            <ProductCard
              key={item.id_menu}
              title={item.name}
              imageUrl={item.menu_image_url}
              description={item.description}
              price={item.price}
            />
          );
        })}
      </div>
      {/* 
        <ProductCard
          className="shrink-0"
          title="La tah caline"
          imageUrl="/src/assets/test/test.webp"
          price="100"
        />
        <ProductCard
          className="shrink-0"
          title="La tah caline"
          imageUrl="/src/assets/test/test.webp"
          description="fort bien gouteux"
          price="100"
        />
        <ProductCard
          className="shrink-0"
          title="La tah caline"
          imageUrl="/src/assets/test/test.webp"
          description="lorem ipsum dolor sit amet consectetur adipisicing elit. dolore quia, quaerat, doloremque, voluptate, quisquam, reiciendis, ipsam, laboriosam, iure, odio, eius, temporibus, fugit, accusamus, asperiores, repellat."
          price="200"
        />
      </div> */}
    </div>
  );
}
