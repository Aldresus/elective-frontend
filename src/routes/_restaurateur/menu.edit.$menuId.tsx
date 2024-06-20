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
import { restaurateurContext } from "@/contexts/restaurateurContext";
import {
  CategoryContent,
  CategoryContentRestaurant,
} from "@/entities/categoryContent";
import { Menu } from "@/entities/menu";
import { Product } from "@/entities/product";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Minus, Plus, Save } from "lucide-react";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_restaurateur/menu/edit/$menuId")({
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

interface addProductCategoryType {
  id_restaurant_category: string;
  updateCategoryDto: {
    ids_product: Array<string>;
  };
}

interface addMenuCategoryType {
  id_restaurant_category: string;
  updateCategoryDto: {
    ids_menu: Array<string>;
  };
}

interface menuDataType {
  id_menu: string;
  name: string;
  description: string;
  menu_image_url: string;
  price: number;
}

function MenuManager() {
  const [data, setData] = useState<
    Array<CategoryContent | CategoryContentRestaurant>
  >([]);
  const [itemsList, setItemsList] = useState<Array<Product | Menu>>([]);
  const [menuData, setMenuData] = useState<menuDataType>({
    id_menu: "",
    name: "",
    description: "",
    menu_image_url: "",
    price: 0,
  });
  const [displayCategory, setdisplayCategory] = useState<boolean>(false);
  const [categoryName, setCategoryName] = useState("");
  const [categoriesEdited, setCategoriesEdited] = useState<
    Array<categoryType | addProductCategoryType | addMenuCategoryType>
  >([]);
  const [categoriesDeleted, setCategoriesDeleted] = useState<Array<string>>([]);

  const { menuId } = Route.useParams();
  const restaurateur = useContext(restaurateurContext);

  const { token } = useAuth();

  useQuery({
    queryKey: ["getMenuCategories", menuId],
    queryFn: async () => {

      const rawData = await axiosInstance(token).get(`/menu/${menuId}`);

      const finalData = (await rawData).data.Menu_Categories;
      console.log("finalData: ", finalData);

      setData(finalData);

      setMenuData({
        id_menu: rawData.data.id_menu,
        name: rawData.data.name,
        description: rawData.data.description,
        menu_image_url: rawData.data.menu_image_url,
        price: rawData.data.price,
      });

      return finalData;
    },
  });

  useQuery({
    queryKey: ["RestaurantProducts", restaurateur.restaurant.id_restaurant],
    queryFn: async () => {
      const rawData = axiosInstance(token).get(
        `/product?id_restaurant=${restaurateur.restaurant.id_restaurant}`
      );

      const finalData = (await rawData).data;

      for (const product of finalData) {
        const itemInList: Product = {
          id_product: product.id_product,
          name: product.name,
          price: product.price,
          description: product.description,
          product_image_url: product.product_image_url,
          id_restaurant: product.id_restaurant,
          ids_menu_category: product.ids_menu_category,
        };
        setItemsList((itemsList) => [...itemsList, itemInList]);
      }
      return finalData;
    },
  });

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
  }, [menuData, reset]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const onCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (categoryName.trim() === "") return;

    const createdCategory = {
      name: categoryName,
      ids_menu: [menuData.id_menu],
      ids_product: [],
    };

    axiosInstance(token)
      .post("/menu/category", createdCategory)
      .then((res) => {
        console.log("Category created");
        console.log(res);
        window.location.reload();
        toast.success("Catégorie créée");
      })
      .catch((err) => {
        console.log("Failed creation category");
        console.log(err);
        toast.error("Une erreur est survenue");
      });

    setCategoryName("");
    setdisplayCategory(false);
  };

  const onSubmit = async (values: z.infer<typeof menuSchema>) => {
    axiosInstance(token)
      .patch(`menu/${menuId}`, {
        name: values.name,
        description: values.description,
        price: values.price,
        menu_image_url: values.image,
        id_restaurant: restaurateur.restaurant.id_restaurant,
      })
      .then((res) => {
        console.log("Insertion réussie");
        console.log(res);
        toast.success("Menu modifié avec succès");
      })
      .catch((err) => {
        console.log("Failed");
        console.log(err);
        toast.error("Une erreur est survenue");
      });

    categoriesEdited.map((editedCategory) => {
      axiosInstance(token)
        .patch(`/menu/productCategory`, editedCategory)
        .then((res) => {
          console.log("Successfull edited categories");
          console.log(res);
          toast.success("Catégorie modifiée");
        })
        .catch((err) => {
          console.log("Categories Failed");
          console.log(err);
        });
    });

    categoriesDeleted.map((deletedCategory) => {
      axiosInstance(token)
        .delete(`/menu/category/${deletedCategory}`)
        .then((res) => {
          console.log("Successfull deleted category");
          console.log(res);
        })
        .catch((err) => {
          console.log("Failed deleted category");
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
              allItemsList={itemsList}
              categoriesEdited={categoriesEdited}
              setCategoriesEdited={setCategoriesEdited}
              data={data}
              setData={setData}
              categoriesDeleted={categoriesDeleted}
              setCategoriesDeleted={setCategoriesDeleted}
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
