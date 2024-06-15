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
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import axios from "axios";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_restaurateur/productManager")({
  component: ProductManager,
});

const productSchema = z.object({
  name: z.string().min(1, { message: "Entrez un nom pour votre produit." }),
  description: z
    .string()
    .min(1, { message: "Entrez une description pour votre produit." }),
  price: z.coerce
    .number()
    .min(0.01, { message: "Indiquez un prix supérieur à 0." }),
  image: z.any(),
});

const instance = axios.create({
  baseURL: "http://localhost:3000/api/",
  timeout: 1000,
});

function ProductManager() {
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      price: 0,
    },
  });

  const { reset } = form;

  const onSubmit = async (values: z.infer<typeof productSchema>) => {
    instance
      .post("product", {
        name: values.name,
        price: values.price,
        description: values.description,
        product_image_url: values.image,
        id_restaurant: "111111111111111111111111",
      })
      .then((res) => {
        console.log("Insertion réussie");
        console.log(res);
        reset();
      })
      .catch((err) => {
        console.log("Failed");
        console.log(err);
      });
  };

  return (
    <div className="h-full w-full">
      <H1 className="pb-4">Gestion d'un produit</H1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2"
        >
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
            name="image"
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
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prix</FormLabel>
                <Input placeholder="Price" type="number" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            <Save />
            Enregistrer
          </Button>
        </form>
      </Form>
    </div>
  );
}
