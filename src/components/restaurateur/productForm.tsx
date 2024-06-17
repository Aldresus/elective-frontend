import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";

interface ProductFormProps {
  onSubmit: SubmitHandler<z.infer<typeof productSchema>>;
  resetForm: boolean;
  setResetForm: Dispatch<SetStateAction<boolean>>;
}

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

export default function ProductForm({
  onSubmit,
  resetForm,
  setResetForm,
}: ProductFormProps) {
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

  useEffect(() => {
    resetForm && reset();
    setResetForm(false);
  }, [resetForm]);

  return (
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
  );
}
