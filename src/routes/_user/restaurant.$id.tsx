import { ProductCarrousel } from "@/components/restaurant/productCarrousel";
import { RestaurantCategory } from "@/components/restaurant/restaurantCategory";
import { H1 } from "@/components/typography";
import type { CategoryContent } from "@/entities/categoryContent";
import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import {
  FullRestaurant,
  isMergedRestaurantCategory,
  mergeRestaurantCategory,
  Restaurant,
} from "@/entities/restaurant";
import { axiosInstance } from "@/lib/axiosConfig";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/restaurant/$id")({
  component: RestaurantPage,
});

// const contentPlaceholder: CategoryContent[] = [
//   {
//     category_id: "1",
//     category_name: "Super ça",
//     items: [
//       {
//         id_menu: "1",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//       {
//         id_menu: "2",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//       {
//         id_product: "1",
//         name: "PAIN",
//         price: 100,
//         product_image_url: "",
//         description: "fort bien gouteux",
//       } as Product,
//       {
//         id_menu: "1",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//       {
//         id_menu: "2",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//       {
//         id_product: "1",
//         name: "PAIN",
//         price: 100,
//         product_image_url: "",
//         description: "fort bien gouteux",
//       } as Product,
//       {
//         id_menu: "1",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//       {
//         id_menu: "2",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//       {
//         id_product: "1",
//         name: "PAIN",
//         price: 100,
//         product_image_url: "",
//         description: "fort bien gouteux",
//       } as Product,
//     ],
//   },
//   {
//     category_id: "2",
//     category_name: "Dessert",
//     items: [
//       {
//         id_menu: "1",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//       {
//         id_menu: "2",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//       {
//         id_product: "1",
//         name: "PAIN",
//         price: 100,
//         product_image_url: "",
//         description: "fort bien gouteux",
//       } as Product,
//     ],
//   },
//   {
//     category_id: "3",
//     category_name: "Dessert",
//     items: [
//       {
//         id_menu: "1",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//       {
//         id_menu: "2",
//         name: "PAIN",
//         price: 100,
//         menu_image_url: "",
//         description: "fort bien gouteux",
//       } as Menu,
//     ],
//   },
// ];

function RestaurantPage() {
  const { id } = Route.useParams();

  const query = useQuery({
    queryKey: ["restaurant", id],
    queryFn: async () => {
      const response = await axiosInstance.get(`/restaurant/${id}`);
      // console.log(response.data);
      let finalData = response.data as FullRestaurant;

      finalData = {
        ...response.data,
        Restaurant_Categories: mergeRestaurantCategory(
          response.data.Restaurant_Categories
        ),
      };

      console.log(finalData);

      return finalData;
    },
  });

  return (
    <div className="space-y-6 w-full">
      <img
        className="w-full h-[200px] object-cover rounded-[20px]"
        src={query.data?.banner_url}
        alt="restaurant"
      />
      <H1 className="text-center">{query.data?.name}</H1>
      {query.data?.Restaurant_Categories.map((category, i) => {
        if (i === 0)
          return (
            <ProductCarrousel
              content={category.items}
              categoryName={category.name}
            />
          );

        return (
          <RestaurantCategory
            key={category.name}
            categoryName={category.name}
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
