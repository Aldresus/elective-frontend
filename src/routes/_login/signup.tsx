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
import { createFileRoute, Link } from "@tanstack/react-router";
import { Fragment, useContext, useState } from "react";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { sha256 } from "js-sha256";
import { RoleEnum, UpdateRoleUser, User } from "@/entities/user";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useRole } from "@/hooks/useRole";

import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosConfig";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { LoginResponse } from "@/entities/login";
import { CreateEmptyRestaurant, Restaurant } from "@/entities/restaurant";
import { restaurateurContext } from "@/contexts/restaurateurContext";

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
    siret: z
      .string()
      .min(14, { message: "Merci d'entrer un SIRET valide" })
      .max(14, { message: "merci d'entrer un SIRET valide" })
      .optional(),
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
  const [psswd, setPsswd] = useState("");
  const [id_usr, setId_usr] = useState("");
  const [email_usr, setEmail_usr] = useState("");
  const [siret, setSiret] = useState("");
  const [toUpdate, setToUpdate] = useState(true);
  const restauContext = useContext(restaurateurContext);

  const roleContext = useRole();
  const { token, login, logout } = useAuth();
  const navigate = Route.useNavigate();

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

  // Register un user avec role client forcé
  // login le user avec le token
  // update le user avec bon role
  // créer un restaurant
  // navigate vers le restaurant

  const userMutation = useMutation({
    mutationFn: async (user: User) => {
      return (await axiosInstance(token as string).post("/user/register", user))
        .data as User;
    },
    onSuccess(data) {
      console.log("success", data);
      setId_usr(data.id as string);
      setEmail_usr(data.email as string);
      console.log(data.email);
      console.log(data.password);
      console.log("User créé !");
      toast.success("User créé !");
      loginMutation.mutateAsync({
        email: data.email as string,
        password: psswd,
      });
      if (roleContext.role === RoleEnum.CLIENT) {
        navigate({
          to: `/user`,
        });
      } else if (roleContext.role === RoleEnum.DELIVERYMAN) {
        navigate({
          to: `/deliveries`,
        });
      }
    },
    onError(error) {
      console.log("error", error);
      toast.error("Erreur lors de la création de la commande");
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (loginData: { email: string; password: string }) => {
      const response = await axiosInstance().post("/user/login", loginData);
      return response.data as LoginResponse;
    },
    onSuccess: (data) => {
      console.log("User est logged !");
      console.log(data);
      login(data.access_token);
      if (roleContext.role === RoleEnum.RESTAURATEUR && toUpdate) {
        updateUserToRestaurateurMutation.mutate({
          id_user: id_usr,
          role: roleContext.role,
        });
      } else if (roleContext.role === RoleEnum.DELIVERYMAN && toUpdate) {
        updateUserToLivreurMutation.mutate({
          id_user: id_usr,
          role: roleContext.role,
        });
      }
    },
    onError: (err) => {
      console.log("Failed", err);
    },
  });

  const updateUserToRestaurateurMutation = useMutation({
    mutationFn: ({ id_user, role }: UpdateRoleUser) => {
      console.log("attempting to update user");
      console.log(token);
      return axiosInstance(token as string).patch(`user/${id_user}`, {
        role,
      });
    },
    onSuccess(data) {
      console.log("success", data);
      setToUpdate(false);
      logout;
      loginMutation
        .mutateAsync({
          email: email_usr,
          password: psswd,
        })
        .then(() => {
          createRestaurantMutation.mutate({
            address: "",
            banner_url: "",
            business_hours: "",
            city: "",
            email: "",
            food_type: "",
            siret: siret,
            name: "Nom du restaurant",
            postal_code: "",
            price_range: "",
            rating: 0.0,
          });
        });
    },
    onError(error) {
      console.log("error", error);
      toast.error("Erreur lors de la mise à jour de l'utilisateur");
      //   toast.success("Votre profil a été mis à jour !");
    },
  });

  const updateUserToLivreurMutation = useMutation({
    mutationFn: ({ id_user, role }: UpdateRoleUser) => {
      console.log("attempting to update user");
      console.log(token);
      return axiosInstance(token as string).patch(`user/${id_user}`, {
        role,
      });
    },
    onSuccess(data) {
      console.log("success", data);
      setToUpdate(false);
      logout;
      loginMutation.mutateAsync({
        email: email_usr,
        password: psswd,
      });
    },
    onError(error) {
      console.log("error", error);
      toast.error("Erreur lors de la mise à jour de l'utilisateur");
      //   toast.success("Votre profil a été mis à jour !");
    },
  });

  const createRestaurantMutation = useMutation({
    mutationFn: async (restaurantData: CreateEmptyRestaurant) => {
      return (
        await axiosInstance(token as string).post("/restaurant", restaurantData)
      ).data as Restaurant;
    },
    onSuccess(data) {
      console.log("success", data);
      toast.success("Restaurant créé !");
      restauContext.restaurant.id_restaurant = data.id_restaurant;
      navigate({
        to: `/restaurant/edit/${restauContext.restaurant.id_restaurant}`,
      });
    },
    onError(error) {
      console.log("error", error);
      toast.error("Erreur lors de la création du restaurant");
    },
  });
  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    console.log(values);
    const hash = sha256(values.password);
    setPsswd(hash);
    setSiret(values.siret as string);
    userMutation.mutateAsync({
      first_name: values.firstName,
      last_name: values.lastName,
      birthday:
        values.birthDay + "-" + values.birthMonth + "-" + values.birthYear,
      phone: values.phone,
      email: values.email,
      password: hash,
      role: roleContext.role as RoleEnum,
      created_at: new Date(),
      edited_at: new Date(),
      id_users: [],
    });

    console.log(hash);
  };

  const [isRadioDisabled, setIsRadioDisabled] = useState(
    roleContext.role === RoleEnum.CLIENT
  );

  const [isFirstRadioChecked, setIsFirstRadioChecked] = useState(true);

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
                  <FormItem>
                    <Separator />
                    <div className="flex items-center gap-4 pt-4 pb-2">
                      <Switch
                        defaultChecked={roleContext.role !== RoleEnum.CLIENT}
                        onCheckedChange={(checked) => {
                          // if the switch is checked and the first radio is checked, the role is set to DELIVERYMAN
                          // if the switch is checked and the first radio is not checked, the role is set to RESTAURATEUR
                          // if the switch is not checked, the role is set to CLIENT
                          if (checked && isFirstRadioChecked) {
                            roleContext.setRole(RoleEnum.DELIVERYMAN);
                          } else if (checked && !isFirstRadioChecked) {
                            roleContext.setRole(RoleEnum.RESTAURATEUR);
                          } else {
                            roleContext.setRole(RoleEnum.CLIENT);
                          }
                          setIsRadioDisabled(!checked);
                        }}
                        id="switch"
                        aria-readonly
                      />
                      <Label htmlFor="switch">
                        <p>Vous n'êtes pas un client ?</p>
                      </Label>
                    </div>
                    <div className="flex px-4">
                      {!isRadioDisabled && (
                        <RadioGroup defaultValue="option-one">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="option-one"
                              id="option-one"
                              onClick={() => {
                                roleContext.setRole(RoleEnum.DELIVERYMAN);
                                setIsFirstRadioChecked(true);
                              }}
                            />
                            <Label htmlFor="option-one">
                              Je suis un livreur
                            </Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem
                              value="option-two"
                              id="option-two"
                              onClick={() => {
                                roleContext.setRole(RoleEnum.RESTAURATEUR);
                                setIsFirstRadioChecked(false);
                              }}
                            />
                            <Label htmlFor="option-two">
                              Je suis un restaurateur
                            </Label>
                          </div>
                        </RadioGroup>
                      )}
                    </div>
                  </FormItem>
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
                  {roleContext.role === RoleEnum.DELIVERYMAN ||
                    (roleContext.role === RoleEnum.RESTAURATEUR && (
                      <FormField
                        control={form.control}
                        name="siret"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>N° de SIRET</FormLabel>
                            <Input
                              placeholder="SIRET"
                              type="text"
                              {...field}
                              onBlur={() => {
                                form.trigger("siret");
                              }}
                            />
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ))}

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
