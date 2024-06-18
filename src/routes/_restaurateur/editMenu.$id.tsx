import { itemsData } from "@/assets/testData";
import CategoryManager from "@/components/restaurant/categoryManager";
import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { CategoryContent } from "@/entities/categoryContent";
import { axiosInstance } from "@/lib/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, Save } from "lucide-react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_restaurateur/editMenu/$id")({
  component: MenuManager,
});

const menuSchema = z.object({
  name: z.string().min(1, { message: "Veillez renseigner le champ." }),
  description: z.string(),
  image: z.any(),
  price: z.coerce.number().min(0, {
    message: "Veuillez indiquer un prix pour votre produit.",
  }),
});

interface categoryType {
  id_product: string;
  id_category: string;
  updateProductDto: {
    ids_menu_category: Array<string>;
  };
  updateCategoryDto: {
    ids_product: Array<string>;
  };
}

interface menuDataType {
  name: string;
  description: string;
  menu_image_url: string;
  price: number;
}

function MenuManager() {
  const [data, setData] = useState<Array<CategoryContent>>([]);
  const [menuData, setMenuData] = useState<menuDataType>({
    name: "",
    description: "",
    menu_image_url: "",
    price: 0,
  });
  const [displayCategory, setdisplayCategory] = useState<Boolean>(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoriesEdited, setCategoriesEdited] = useState<Array<categoryType>>(
    []
  );

  const { id } = Route.useParams();

  const query = useQuery({
    queryKey: ["getMenuItems", id],
    queryFn: async () => {
      const rawData = await axiosInstance.get(`/menu/${id}`);

      const finalData = rawData.data.Menu_Categories;

      setData(finalData);

      setMenuData({
        name: rawData.data.name,
        description: rawData.data.description,
        menu_image_url: rawData.data.menu_image_url,
        price: rawData.data.price,
      });

      console.log(menuData);
      console.log("everything");
      console.log(rawData.data);
      console.log("final data");
      console.log(finalData);
      console.log("data before");
      console.log(data);

      return finalData;
    },
  });
  console.log("data after");
  console.log(data);

  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: menuData?.name,
      description: menuData?.description,
      image: menuData?.menu_image_url,
      price: menuData?.price,
    },
  });

  const { reset } = form;

  useEffect(() => {
    reset({
      name: menuData.name,
      description: menuData.description,
      image: "",
      price: menuData.price,
    });
  }, [menuData]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const onCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryName.trim() === "") return;

    // get max category id
    const newId = Math.max.apply(
      Math,
      query.data.map(function (o) {
        return parseInt(o.category_id);
      })
    );
    setData([
      ...data,
      {
        name: categoryName,
        id_category: (newId + 1).toString(),
        Product: [],
        ids_menu: [],
        ids_product: [],
      },
    ]);
    setdisplayCategory(false);
  };

  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjZkOTk1NGNmOTY1ZDM0MGZjMGUyNmEiLCJ1c2VybmFtZSI6InNvcGhpYS5qb25lc0BleGFtcGxlLmNvbSIsInJvbGUiOiJDT01NRVJDSUFMIiwiaWF0IjoxNzE4NDgxNTY0LCJleHAiOjE3MTkzODE1NjR9.9U_4HSizx2BhJGVf1ByBdGwomvx0fQqTT9VRs_K5ODM`,
  };

  const onSubmit = async (values: z.infer<typeof menuSchema>) => {
    axiosInstance
      .patch(
        `menu/${id}`,
        {
          name: values.name,
          description: values.description,
          price: values.price,
          menu_image_url: values.image,
          id_restaurant: "111111111111111111111111", //todo dynamik
        },
        {
          headers,
        }
      )
      .then((res) => {
        console.log("Insertion réussie");
        console.log(res);
      })
      .catch((err) => {
        console.log("Failed");
        console.log(err);
      });

    categoriesEdited.map((editedCategory) => {
      console.log("oui: ", editedCategory);
      axiosInstance
        .patch(`/menu/productCategory`, editedCategory)
        .then((res) => {
          console.log("Successfull edited categories");
          console.log(res);
        })
        .catch((err) => {
          console.log("Categories Failed");
          console.log(err);
        });
    });
  };

  return (
    <div className="h-full w-full">
      <H1>Modifier un menu</H1>
      <div className="h-full w-full flex flex-col gap-4 pb-40 overflow-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Name"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Menu Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Description"
                      className="w-full"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      placeholder="Select an image"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price (€)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="fixed bottom-14 w-[82%]" type="submit">
              <Save />
              Enregistrer
            </Button>
          </form>
        </Form>
        {data.map((category) => (
          <div key={category.id_category}>
            <Separator />
            <CategoryManager
              category={category}
              allItemsList={itemsData}
              categoriesEdited={categoriesEdited}
              setCategoriesEdited={setCategoriesEdited}
            />
          </div>
        ))}
        {displayCategory && (
          <form onSubmit={onCategorySubmit}>
            <div>
              <p>Ajouter catégorie</p>
              <div className="flex items-center justify-between">
                <Input
                  name="category"
                  type="text"
                  placeholder="Category Name"
                  className="w-4/5"
                  value={categoryName}
                  onChange={handleInputChange}
                />
                <Button className="flex gap-1" type="submit">
                  <Plus />
                </Button>
              </div>
            </div>
          </form>
        )}

        <Button
          className="w-full flex gap-1"
          variant="outline"
          onClick={() => setdisplayCategory(!displayCategory)}
        >
          {!displayCategory && (
            <>
              <Plus />
              Add Category
            </>
          )}
          {displayCategory && (
            <>
              <Minus />
              Annuler
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
