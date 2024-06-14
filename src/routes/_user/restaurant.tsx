import { ProductCarrousel } from "@/components/restaurant/productCarrousel";
import { RestaurantCategory } from "@/components/restaurant/restaurantCategory";
import { H1 } from "@/components/typography";
import type { CategoryContent } from "@/entities/categoryContent";
import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/restaurant")({
  component: Restaurant,
});

const contentPlaceholder: CategoryContent[] = [
  {
    category_id: "1",
    category_name: "Super ça",
    items: [
      {
        id_menu: "1",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
      {
        id_menu: "2",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
      {
        id_product: "1",
        name: "PAIN",
        price: 100,
        product_image_url: "",
        description: "fort bien gouteux",
      } as Product,
      {
        id_menu: "1",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
      {
        id_menu: "2",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
      {
        id_product: "1",
        name: "PAIN",
        price: 100,
        product_image_url: "",
        description: "fort bien gouteux",
      } as Product,
      {
        id_menu: "1",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
      {
        id_menu: "2",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
      {
        id_product: "1",
        name: "PAIN",
        price: 100,
        product_image_url: "",
        description: "fort bien gouteux",
      } as Product,
    ],
  },
  {
    category_id: "2",
    category_name: "Dessert",
    items: [
      {
        id_menu: "1",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
      {
        id_menu: "2",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
      {
        id_product: "1",
        name: "PAIN",
        price: 100,
        product_image_url: "",
        description: "fort bien gouteux",
      } as Product,
    ],
  },
  {
    category_id: "3",
    category_name: "Dessert",
    items: [
      {
        id_menu: "1",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
      {
        id_menu: "2",
        name: "PAIN",
        price: 100,
        menu_image_url: "",
        description: "fort bien gouteux",
      } as Menu,
    ],
  },
];

function Restaurant() {
  return (
    <div className="space-y-6 w-full">
      <img
        className="w-full h-[200px] object-cover rounded-[20px]"
        src="/src/assets/test/test.webp"
        alt="restaurant"
      />
      <H1 className="text-center">La mie tah caline</H1>
      {contentPlaceholder.map((category, i) => {
        if (i === 0)
          return (
            <ProductCarrousel
              content={category.items}
              title={category.category_name}
            />
          );

        return (
          <RestaurantCategory
            key={category.category_name}
            title={category.category_name}
            content={category.items}
          />
        );
      })}
      {/* <div className="flex flex-wrap gap-3">
        <HorizontalProductCard
          title="La tah caline"
          imageUrl="/src/assets/test/test.webp"
          description="fort bien gouteux"
          price={100}
        />
        <HorizontalProductCard
          title="La tah caline"
          imageUrl="/src/assets/test/test.webp"
          description="lorem ipsum dolor sit amet consectetur adipisicing elit. dolore quia, quaerat, doloremque, voluptate, quisquam, reiciendis, ipsam, laboriosam, iure, odio, eius, temporibus, fugit, accusamus, asperiores, repellat."
          price={100}
        />
        <HorizontalProductCard
          title="La tah caline"
          imageUrl="/src/assets/test/test.webp"
          price={100}
        />
      </div>
      <div className="flex flex-wrap gap-3">
        <VerticalProductCard
          title="La tah caline"
          price={12.34}
          imageUrl="/src/assets/test/test.webp"
        />
        <VerticalProductCard
          title="La tah caline"
          price={100}
          imageUrl="/src/assets/test/test.webp"
        />
        <VerticalProductCard
          title="La tah caline"
          price={200}
          imageUrl="/src/assets/test/test.webp"
        />
      </div> */}
    </div>
  );
}
