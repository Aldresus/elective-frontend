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

  const headers = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjZkOTk1NGNmOTY1ZDM0MGZjMGUyNmEiLCJ1c2VybmFtZSI6InNvcGhpYS5qb25lc0BleGFtcGxlLmNvbSIsInJvbGUiOiJDT01NRVJDSUFMIiwiaWF0IjoxNzE4NDgxNTY0LCJleHAiOjE3MTkzODE1NjR9.9U_4HSizx2BhJGVf1ByBdGwomvx0fQqTT9VRs_K5ODM`,
  };

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
              id_restaurant: "111111111111111111111111", // todo: dynamic  todo: header authorization
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
