import { H1 } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { createFileRoute } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const Route = createFileRoute("/_login/login")({
  component: Login,
});

const signinSchema = z.object({
  email: z.string().email({
    message: "Entrez une adresse email valide",
  }),
  password: z.string(),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  const form = useForm<z.infer<typeof signinSchema>>({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signinSchema>) => {
    console.log(values);
  };

  const resetPasswordHandler = (email: string) => {
    console.log(email);
    alert("reset password");
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <H1>Se connecter</H1>
        </CardHeader>
        <CardContent className="flex flex-col">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="email" {...field} />
                    </FormControl>
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
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="mot de passe"
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
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* <AlertDialog>
                <AlertDialogTrigger>
                  <Button type="button" variant="link" className="px-0 pt-0">
                    Mot de passe oublié ?
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Mot de passe oublié ?</AlertDialogTitle>
                    <AlertDialogDescription>
                      Entrez votre adresse email pour réinitialiser votre mot de
                      passe.
                      <form>
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              value={resetPasswordEmail}
                              onInput={(e) =>
                                setResetPasswordEmail(e.target.value)
                              }
                              placeholder="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </form>
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => resetPasswordHandler(resetPasswordEmail)}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog> */}

              <Dialog>
                <DialogTrigger>
                  <Button type="button" variant="link" className="px-0 pt-0">
                    Mot de passe oublié ?
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="space-y-4">
                    <DialogTitle>Mot de passe oublié ?</DialogTitle>
                    <DialogDescription className="space-y-4">
                      <p>
                        Pas de panique, Entrez votre adresse email pour
                        réinitialiser votre mot de passe.
                      </p>
                      <form>
                        <FormItem>
                          <FormControl>
                            <Input
                              value={resetPasswordEmail}
                              onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                setResetPasswordEmail(
                                  (e.target as HTMLInputElement).value
                                )
                              }
                              placeholder="email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      </form>
                    </DialogDescription>
                    <DialogFooter>
                      <DialogClose className="flex gap-4">
                        <Button type="button" variant="link">
                          Annuler
                        </Button>
                        <Button
                          type="button"
                          onClick={() =>
                            resetPasswordHandler(resetPasswordEmail)
                          }
                        >
                          Réinitialiser
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              <div className="flex gap-4 justify-end">
                <Link to="/signup">
                  <Button variant="link">Créer un compte</Button>
                </Link>
                <Button type="submit">Se connecter</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
