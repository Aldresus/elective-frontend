import ProductForm from "@/components/restaurateur/productForm";
import { H1 } from "@/components/typography";
import { restaurateurContext } from "@/contexts/restaurateurContext";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { createFileRoute } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_restaurateur/product/new")({
  component: CreateProduct,
});

function CreateProduct() {
  const [resetForm, setResetForm] = useState<boolean>(false);
  const restaurateur = useContext(restaurateurContext);
  const { token } = useAuth();

  return (
    <div className="h-full w-full">
      <H1 className="pb-4">Créer un produit</H1>
      <ProductForm
        onSubmit={async (values) => {
          console.log("oui");
          axiosInstance(token)
            .post("product", {
              name: values.name,
              price: values.price,
              description: values.description,
              product_image_url: values.product_image_url,
              id_restaurant: restaurateur.restaurant.id_restaurant,
            })
            .then((res) => {
              console.log("Insertion réussie");
              console.log(res);
              setResetForm(true);
              toast.success("Le produit a été créé");
            })
            .catch((err) => {
              console.log("Failed");
              console.log(err);
              toast.error("Une erreur est survenue");
            });
        }}
        resetForm={resetForm}
        setResetForm={setResetForm}
      />
    </div>
  );
}
