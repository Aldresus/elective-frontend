import { H1, Large } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createFileRoute } from "@tanstack/react-router";
import { Fragment, useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";

export const Route = createFileRoute("/_login/signup")({
  component: Login,
});

const uppercaseRegex = /[A-ZÀ-ÖØ-öø-ÿ]/;
const lowercaseRegex = /[a-zà-öø-ÿ]/;
const digitRegex = /[0-9]/;
const specialCharRegex = /[^a-zA-Z0-9]/;

const signupSchema = z
  .object({
    email: z.string().email({
      message: "Entrez une adresse email valide",
    }),
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
    firstName: z.string().min(1, { message: "Entrez votre prénom" }),
    lastName: z.string().min(1, { message: "Entrez votre nom" }),
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
    phone: z
      .string()
      .min(10, { message: "Entrez un numéro de téléphone valide" })
      .max(10, { message: "Entrez un numéro de téléphone valide" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Ces mots de passe ne correspondent pas. Veuillez réessayer.",
    path: ["confirmPassword"],
  });

function Login() {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      birthDay: "", //use an empty string so the placeholder is shown
      birthMonth: "", //use an empty string so the placeholder is shown
      birthYear: "", //use an empty string so the placeholder is shown
      phone: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    console.log(values);
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-baseline">
            <H1>Inscription</H1>
            <Large>{currentStep}/2</Large>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="flex flex-col space-y-4">
              {currentStep === 1 && (
                <Fragment>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <Input
                            placeholder="Email"
                            type="email"
                            {...field}
                            onBlur={() => {
                              form.trigger("email");
                            }}
                          />
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
                              onBlur={() => {
                                form.trigger("password");
                              }}
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
                  </div>

                  <div>
                    Vous êtes parrainé par <b>dskqlmdkqslmd</b>
                  </div>
                  <div className="flex gap-4 justify-end">
                    <Link to="/login">
                      <Button type="button" variant="link">
                        Vous avez déjà un compte ?
                      </Button>
                    </Link>

                    <Button
                      onClick={() => {
                        //check if all fields are valid before continuing
                        form.trigger("email");
                        form.trigger("password");
                        form.trigger("confirmPassword");

                        if (
                          form.formState.validatingFields.email &&
                          form.formState.validatingFields.password &&
                          form.formState.validatingFields.confirmPassword
                        ) {
                          setCurrentStep(() => 2);
                        }
                      }}
                    >
                      Continuer
                    </Button>
                  </div>
                </Fragment>
              )}
              {currentStep === 2 && (
                <Fragment>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <Input
                          placeholder="Prénom"
                          type="text"
                          {...field}
                          onBlur={() => {
                            form.trigger("firstName");
                          }}
                        />
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
                        <Input
                          placeholder="Nom"
                          type="text"
                          {...field}
                          onBlur={() => {
                            form.trigger("lastName");
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div>
                    Date de naissance
                    <div className="flex gap-4 justify-end">
                      <FormField
                        control={form.control}
                        name="birthDay"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Jour</FormLabel>
                            <Input
                              type="number"
                              placeholder="JJ"
                              {...field}
                              onBlur={() => {
                                form.trigger("birthDay");
                              }}
                            />
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
                            <Input
                              type="number"
                              placeholder="MM"
                              {...field}
                              onBlur={() => {
                                form.trigger("birthMonth");
                              }}
                            />
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
                            <Input
                              type="number"
                              placeholder="AAAA"
                              {...field}
                              onBlur={() => {
                                form.trigger("birthYear");
                              }}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <Input
                          placeholder="Téléphone"
                          type="tel"
                          {...field}
                          onBlur={() => {
                            form.trigger("phone");
                          }}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="flex gap-4 justify-end">
                    <Button variant="link" onClick={() => setCurrentStep(1)}>
                      Retour
                    </Button>
                    <Button type="submit">S'inscrire</Button>
                  </div>
                </Fragment>
              )}
            </CardContent>
          </form>
        </Form>
      </Card>
    </div>
  );
}
