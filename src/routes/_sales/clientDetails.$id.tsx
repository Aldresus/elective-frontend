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
import { Client } from "@/entities/client";
import { axiosInstance } from "@/lib/axiosConfig";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_sales/clientDetails/$id")({
  component: ClientDetails,
});

const uppercaseRegex = /[A-ZÀ-ÖØ-öø-ÿ]/;
const lowercaseRegex = /[a-zà-öø-ÿ]/;
const digitRegex = /[0-9]/;
const specialCharRegex = /[^a-zA-Z0-9]/;

const clientSchema = z.object({
  lastName: z.string().min(1, { message: "Ce champ doit être rempli." }),
  firstName: z.string().min(1, { message: "Ce champ doit être rempli." }),
  email: z
    .string()
    .min(1, { message: "Ce champ doit être rempli." })
    .email("Cet adresse e-mail n'est pas valide."),
  password: z
    .string()
    .min(8, {
      message: "Entrez un mot de passe de 8 caractères ou plus",
    })
    .regex(uppercaseRegex, {
      message: "Votre mot doit contenir au moins une lettre majuscule",
    })
    .regex(lowercaseRegex, {
      message: "Votre mot doit contenir au moins une lettre minuscule",
    })
    .regex(digitRegex, {
      message: "Votre mot doit contenir au moins un chiffre",
    })
    .regex(specialCharRegex, {
      message: "Votre mot doit contenir au moins un caractère spécial",
    }),
  confirmPassword: z.string(),
  phone: z
    .string()
    .length(10, { message: "Entrez un numéro de téléphone valide." }),
  birthDay: z.coerce
    .number()
    .min(1, "Entrez un jour valide")
    .max(31, "Entrez un jour valide")
    .or(z.literal("")), //allow empty string so the placeholder is shown
  birthMonth: z.coerce
    .number()
    .min(1, "Entrez un mois valide")
    .max(12, "Entrez un mois valide")
    .or(z.literal("")), //allow empty string so the placeholder is shown
  birthYear: z.coerce
    .number()
    .min(1900, "Entrez une année valide")
    .max(2024, "Entrez une année valide")
    .or(z.literal("")), //allow empty string so the placeholder is shown
});

function ClientDetails() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const { id } = Route.useParams();

  //todo: get token dynamikly
  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjZkOTk1NGNmOTY1ZDM0MGZjMGUyNmEiLCJ1c2VybmFtZSI6InNvcGhpYS5qb25lc0BleGFtcGxlLmNvbSIsInJvbGUiOiJDT01NRVJDSUFMIiwiaWF0IjoxNzE4NDgxNTY0LCJleHAiOjE3MTkzODE1NjR9.9U_4HSizx2BhJGVf1ByBdGwomvx0fQqTT9VRs_K5ODM`,
  };

  const query = useQuery({
    queryKey: ["client"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/user?id=${id}`, {
        headers,
      });
      // console.log(response.data);
      let finalData = response.data[0] as Client;

      console.log(finalData);

      return finalData;
    },
  });

  const form = useForm<z.infer<typeof clientSchema>>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      lastName: "",
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      birthDay: "",
      birthMonth: "",
      birthYear: "",
    },
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      const data = query.data;
      const birthdateParts = data.birthday.split("-");
      form.reset({
        lastName: data.last_name,
        firstName: data.first_name,
        email: data.email,
        password: "",
        confirmPassword: "",
        phone: data.phone,
        birthDay: parseInt(birthdateParts[2]),
        birthMonth: parseInt(birthdateParts[1]),
        birthYear: parseInt(birthdateParts[0]),
      });
    }
  }, [query.isSuccess]);

  const onSubmit = async (values: z.infer<typeof clientSchema>) => {
    console.log(values);

    const dataToSend = {
      last_name: values.lastName,
      first_name: values.firstName,
      email: values.email,
      birthday: `${values.birthYear}-${values.birthMonth}-${values.birthDay}`,
      phone: values.phone,
      role: "CLIENT",
      password: values.password,
      id_restaurant: "000000000000000000000000",
    };

    axiosInstance
      .patch(`/user/${id}`, dataToSend, {
        headers,
      })
      .then((res) => {
        console.log("Insertion réussie");
        console.log(res);
        navigate({ to: "/allClients" });
      })
      .catch((err) => {
        console.log("Failed");
        console.log(err);
      });
  };

  return (
    <div className="h-full w-full overflow-auto pb-16">
      <H1>Client page</H1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="firstName"
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
            name="lastName"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail</FormLabel>
                <Input placeholder="E-mail" type="email" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <div className="relative">
                  <Input
                    className="pr-10"
                    placeholder="Mot de passe"
                    type={showPassword ? "text" : "password"}
                    {...field}
                  />
                  {showPassword ? (
                    <EyeOff
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-2.5 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      className="absolute right-2 top-2.5 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirmez votre mot de passe</FormLabel>
                <div className="relative">
                  <Input
                    className="pr-10"
                    placeholder="Mot de passe"
                    type={showConfirmPassword ? "text" : "password"}
                    {...field}
                    onBlur={() => {
                      form.trigger("confirmPassword");
                    }}
                  />
                  {showConfirmPassword ? (
                    <EyeOff
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-2 top-2.5 cursor-pointer"
                    />
                  ) : (
                    <Eye
                      className="absolute right-2 top-2.5 cursor-pointer"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <Input placeholder="Téléphone" type="tel" {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mb-4">
            Date de naissance
            <div className="flex gap-4 justify-end">
              <FormField
                control={form.control}
                name="birthDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jour</FormLabel>
                    <Input type="number" placeholder="JJ" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthMonth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mois</FormLabel>
                    <Input type="number" placeholder="MM" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="birthYear"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Annéee</FormLabel>
                    <Input type="number" placeholder="AAAA" {...field} />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            <Save />
            Enregistrer
          </Button>
        </form>
      </Form>
    </div>
  );
}
