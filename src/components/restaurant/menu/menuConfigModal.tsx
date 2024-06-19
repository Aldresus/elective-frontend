import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "../../ui/dialog";
import type { FullMenu, Menu } from "@/entities/menu";
import { H1, Large, Small } from "../../typography";
import { Separator } from "../../ui/separator";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axiosConfig";
import { MenuCategoryProducts } from "./menuCategoryProducts";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { Product } from "@/entities/product";
import { OrderProduct, productToOrderProduct } from "@/entities/order";
import { Form, FormField } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { currentOrderContext } from "@/contexts/currentOrderContext";
import { toast } from "sonner";

interface MenuConfigModalProps extends React.HTMLAttributes<HTMLDivElement> {
  open: boolean;
  close: () => void;
  menuContent: Menu;
  enableQuery?: boolean;
}

// const formSchema = z.array(z.array(z.string()));

export function MenuConfigModal({
  open,
  close,
  menuContent,
  enableQuery = true,
  ...props
}: MenuConfigModalProps) {
  console.log(menuContent);
  const currentOrder = useContext(currentOrderContext);

  const query = useQuery({
    queryKey: ["menu", menuContent.id_menu],
    queryFn: async () => {
      const response = await axiosInstance.get(`/menu/${menuContent.id_menu}`);
      console.log("menu details", response.data);

      return response.data as FullMenu;
    },
    enabled: open && enableQuery,
  });

  const formValidationSchemes = query.data?.Menu_Categories.map((category) => ({
    id: category.id_category,
    products: category.Product,
  }));

  const zodObj = formValidationSchemes?.reduce(
    (acc, scheme) => {
      const productIds = scheme.products.map(
        (product: Product) => product.id_product
      );

      acc[scheme.id] = z.enum(
        [productIds[0], ...productIds.slice(1)] as [string, ...string[]],
        {
          message: "Vous devez choisir un produit !",
        }
      );

      return acc;
    },
    {} as { [key: string]: z.ZodType }
  );

  console.log("formValidationSchemes", formValidationSchemes);
  console.log("zodObj", zodObj);

  const formSchema = z.object(zodObj ?? {});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log("menu submit", data);
    const orderProducts: OrderProduct[] = [];

    Object.keys(data).forEach((key) => {
      const productId = data[key];
      const category = query.data?.Menu_Categories.find(
        (category) => category.id_category === key
      );

      const product = category?.Product.find(
        (product) => product.id_product === productId
      );
      if (product) {
        const orderProduct = productToOrderProduct(product);
        orderProducts.push(orderProduct);
      }
    });
    toast.success(`${menuContent.name} ajouté à votre commande`);

    console.log("orderProducts", orderProducts);
    currentOrder.addMenu({
      id_menu: menuContent.id_menu,
      name: menuContent.name,
      description: menuContent.description,
      price: menuContent.price,
      products: orderProducts,
    });

    //reset form
    form.reset();

    close();
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        console.log(e);
        close();
      }}
      {...props}
    >
      <DialogContent className="p-0 border-none">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="rounded-t-lg h-[200px] overflow-hidden object-fill">
              <img
                className="w-full h-full object-cover"
                src={menuContent.menu_image_url}
                alt={menuContent.name}
              />
            </div>
            <div className="p-6 pb-2 overflow-y-scroll max-h-[500px] ">
              <DialogHeader>
                <H1>{menuContent.name}</H1>
                <div className="flex justify-between gap-2">
                  <div>{menuContent.description}</div>
                  <Large>{menuContent.price} €</Large>
                </div>
                <Separator />
                <div className="space-y-4">
                  {query.data?.Menu_Categories.map((category, i) => (
                    <FormField
                      key={category.id_category}
                      control={form.control}
                      name={category.id_category}
                      render={({ field }) => (
                        <MenuCategoryProducts
                          field={field}
                          category={category}
                          key={category.id_category}
                          bottomDivider={
                            !(i === query.data?.Menu_Categories.length - 1)
                          }
                        />
                      )}
                    />
                  ))}
                </div>
              </DialogHeader>
            </div>
            <DialogFooter className="flex flex-row justify-center sm:justify-center p-6 gap-4">
              <Button variant="link" onClick={close}>
                Annuler
              </Button>
              <Button type="submit">
                <p>
                  Ajouter pour <Small>{menuContent.price}€</Small>
                </p>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
