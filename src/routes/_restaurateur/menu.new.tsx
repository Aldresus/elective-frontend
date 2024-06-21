import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { restaurateurContext } from "@/contexts/restaurateurContext";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export const Route = createFileRoute("/_restaurateur/menu/new")({
  component: NewMenu,
});

const menuSchema = z.object({
  name: z.string().min(1, { message: "Entrez un nom pour votre produit." }),
  description: z
    .string()
    .min(1, { message: "Entrez une description pour votre produit." }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Indiquez un prix supérieur à 0." }),
  menu_image_url: z.any(),
});

function NewMenu() {
  const { token } = useAuth();
  const navigate = Route.useNavigate();

  const restaurateur = useContext(restaurateurContext);

  const form = useForm<z.infer<typeof menuSchema>>({
    resolver: zodResolver(menuSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      menu_image_url: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof menuSchema>) => {
    axiosInstance(token)
      .post("menu", {
        name: values.name,
        price: values.price,
        description: values.description,
        menu_image_url: "",
        id_restaurant: restaurateur.restaurant.id_restaurant,
        ids_menu_category: [],
        ids_restaurant_category: [],
      })
      .then((res) => {
        console.log("Insertion réussie");
        console.log(res);
        toast.success("Menu créé !");
        navigate({
          to: "/offerings",
        });
      })
      .catch((err) => {
        console.log("Failed");
        console.log(err);
      });
  };

  return (
    <div className="w-full h-full">
      <H1>Créer un menu</H1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="w-full flex flex-col gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
                  <Input placeholder="Nom" type="text" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <Textarea placeholder="Description" {...field} />
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
                  <Input placeholder="Prix (€)" type="number" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="menu_image_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    placeholder="Select an image"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              <Save />
              Créer
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
