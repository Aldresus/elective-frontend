import ProductForm from "@/components/restaurateur/productForm";
import { H1 } from "@/components/typography";
import { restaurateurContext } from "@/contexts/restaurateurContext";
import { EditProduct, Product } from "@/entities/product";
import { useAuth } from "@/hooks/useAuth";
import { axiosInstance } from "@/lib/axiosConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useContext, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/_restaurateur/product/edit/$productId")({
  component: ProductEditor,
});

function ProductEditor() {
  const [resetForm, setResetForm] = useState<boolean>(false);
  const [product, setProduct] = useState<EditProduct>();
  const { token } = useAuth();
  const restaurateur = useContext(restaurateurContext);

  const { productId } = Route.useParams();

  console.log(productId, !!productId);

  const productQuery = useQuery({
    queryKey: ["product", productId],
    queryFn: async () => {
      console.log("request");

      const response = await axiosInstance(token).get(`product/${productId}`);

      console.log("res", response.data);

      return response.data as Product;
    },
    enabled: !!productId,
  });

  const productMutation = useMutation({
    mutationKey: ["product", productId],
    mutationFn: (values: EditProduct) => {
      return axiosInstance(token).patch(`product/${productId}`, {
        name: values.name,
        price: values.price,
        description: values.description,
        product_image_url: values.product_image_url,
        id_restaurant: restaurateur.restaurant.id_restaurant,
      });
    },
    onError: (err) => {
      console.log("Failed");
      console.log(err);
      toast.error("Une erreur est survenue");
    },
    onSuccess: (res) => {
      console.log("Insertion réussie");
      console.log(res);
      toast.success("Produit modifié avec succès !");
      setResetForm(true);
    },
  });

  return (
    <div className="h-full w-full">
      <H1 className="pb-4">Editer un produit</H1>
      {productQuery.isLoading && <p>Chargement...</p>}
      {productQuery.isSuccess && (
        <ProductForm
          product={productQuery.data}
          onSubmit={(values) => {
            productMutation.mutate({
              ...values,
              product_image_url: values.product_image_url || "",
            });
          }}
          resetForm={resetForm}
          setResetForm={setResetForm}
        />
      )}
    </div>
  );
}
