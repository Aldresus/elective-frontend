import ProductForm from "@/components/restaurateur/productForm";
import { H1 } from "@/components/typography";
import { axiosInstance } from "@/lib/axiosConfig";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_restaurateur/createProduct")({
  component: CreateProduct,
});

function CreateProduct() {
  const [resetForm, setResetForm] = useState<boolean>(false);

  return (
    <div className="h-full w-full">
      <H1 className="pb-4">Créer un produit</H1>
      <ProductForm
        onSubmit={async (values) => {
          console.log("oui");
          axiosInstance
            .post("product", {
              name: values.name,
              price: values.price,
              description: values.description,
              product_image_url: values.image,
              id_restaurant: "111111111111111111111111", // todo: dynamic
            })
            .then((res) => {
              console.log("Insertion réussie");
              console.log(res);
              setResetForm(true);
            })
            .catch((err) => {
              console.log("Failed");
              console.log(err);
            });
        }}
        resetForm={resetForm}
        setResetForm={setResetForm}
      />
    </div>
  );
}
