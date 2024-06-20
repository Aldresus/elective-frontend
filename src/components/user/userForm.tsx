import { Save } from "lucide-react";
import { Button } from "../ui/button";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";

interface UserFormProps {
  onSubmit: SubmitHandler<z.infer<typeof userSchema>>;
  defaultValues: z.infer<typeof userSchema>;
}

const userSchema = z.object({
  first_name: z.string().min(1, { message: "Entrez un prénom." }),
  last_name: z.string().min(1, { message: "Entrez un nom." }),
  email: z.string().email({ message: "Entrez une adresse email valide." }),
  phone: z.string().min(1, { message: "Entrez un numéro de téléphone." }),
});

export default function UserForm({ onSubmit, defaultValues }: UserFormProps) {
  const [resetForm, setResetForm] = useState(false);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
    },
    values: {
      ...defaultValues,
    },
  });

  const { reset } = form;

  useEffect(() => {
    resetForm && reset();
    setResetForm(false);
  }, [reset, resetForm]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="last_name"
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
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Prénom</FormLabel>
              <Input placeholder="Prénom" type="text" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse email</FormLabel>
              <Input
                placeholder="Adresse email"
                type="email"
                // defaultValue={defaultValues.email}
                {...field}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numéro de téléphone</FormLabel>
              <Input placeholder="Numéro de téléphone" type="tel" {...field} />
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row text-center justify-center gap-4 mt-2">
          <Button type="submit" variant="default">
            <Save /> Modifier mon profil
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={() => setResetForm(true)}
          >
            Réinitialiser
          </Button>
        </div>
      </form>
    </Form>
  );
}
