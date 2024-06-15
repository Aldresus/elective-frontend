import { ProductCarrousel } from "@/components/restaurant/productCarrousel";
import { RestaurantCategory } from "@/components/restaurant/restaurantCategory";
import { H1 } from "@/components/typography";
import type { CategoryContent } from "@/entities/categoryContent";
import type { Menu } from "@/entities/menu";
import type { Product } from "@/entities/product";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/restaurant")({
  component: Restaurant,
});

const contentPlaceholder: CategoryContent[] = [
  {
    category_id: "1",
    category_name: "Main Course",
    items: [
      {
        id_menu: "1",
        name: "Menu Steak",
        price: 25.99,
        menu_image_url: "https://picsum.photos/200",
        products: [
          {
            id_product: "1",
            name: "Burger",
            price: 12.99,
            product_image_url: "https://picsum.photos/200",
            category: "Burger",
            description:
              "Classic cheeseburger with lettuce, tomato, and special sauce.",
          } as Product,
          {
            id_product: "2",
            name: "Mozzarella Burger",
            price: 9.99,
            product_image_url: "https://picsum.photos/200",
            category: "Burger",
            description:
              "Modern mozzarella burger with tomato, lettuce, and tomato sauce.",
          },
          {
            id_product: "3",
            name: "Calamari Burger",
            price: 11.99,
            product_image_url: "https://picsum.photos/200",
            category: "Burger",
            description:
              "Calamari burger with tomato, lettuce, and tomato sauce.",
          },
          {
            id_product: "4",
            name: "Cheeseburger",
            price: 10.99,
            product_image_url: "https://picsum.photos/200",
            category: "Burger",
            description:
              "Classic cheeseburger with lettuce, tomato, and special sauce.",
          },
          {
            id_product: "5",
            name: "French Fries",
            price: 2.99,
            product_image_url: "https://picsum.photos/200",
            category: "Sides",
            description: "French fries",
          },
          {
            id_product: "6",
            name: "Onion Rings",
            price: 2.99,
            product_image_url: "https://picsum.photos/200",
            category: "Sides",
            description: "Onion rings",
          },
          {
            id_product: "7",
            name: "Fruit Salad",
            price: 2.99,
            product_image_url: "https://picsum.photos/200",
            category: "Dessert",
            description: "Fruit salad",
          },
          {
            id_product: "8",
            name: "Ice Cream",
            price: 5.99,
            product_image_url: "https://picsum.photos/200",
            category: "Dessert",
            description: "Assorted flavors of premium ice cream.",
          },
          {
            id_product: "9",
            name: "Chocolate Cake",
            price: 8.99,
            product_image_url: "https://picsum.photos/200",
            category: "Dessert",
            description:
              "Rich chocolate cake with layers of chocolate ganache.",
          },
        ],
        description: "Burger with his fries and dessert.",
      } as Menu,
      {
        id_product: "1",
        name: "Burger",
        price: 12.99,
        product_image_url: "https://picsum.photos/200",
        description:
          "Classic cheeseburger with lettuce, tomato, and special sauce.",
      } as Product,
    ],
  },
];

function Restaurant() {
  return (
    <div className="space-y-6 w-full">
      {/* {selectedItem && isMenu(selectedItem) && (
        <MenuConfigModal
          content={selectedItem}
          open={selectedItem !== undefined}
          close={() => {
            console.log("close");
            setSelectedItem(undefined);
          }}
        />
      )} */}
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
