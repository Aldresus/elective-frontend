import ProductForm from "@/components/restaurateur/productForm";
import { H1 } from "@/components/typography";
import { axiosInstance } from "@/lib/axiosConfig";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/_restaurateur/editProduct/$id")({
  component: EditProduct,
});

function EditProduct() {
  const [resetForm, setResetForm] = useState<boolean>(false);

  const { id } = Route.useParams();

  return (
    <div className="h-full w-full">
      <H1 className="pb-4">Créer un produit</H1>
      <ProductForm
        onSubmit={async (values) => {
          axiosInstance
            .patch(`product/${id}`, {
              name: values.name,
              price: values.price,
              description: values.description,
              product_image_url: values.image,
              id_restaurant: "111111111111111111111111", //todo dynamik
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
