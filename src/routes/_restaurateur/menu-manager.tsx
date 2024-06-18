// import { categoryData, itemsData } from "@/assets/testData";
// import CategoryManager from "@/components/restaurant/categoryManager";
// import { H1 } from "@/components/typography";
// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Separator } from "@/components/ui/separator";
// import { Textarea } from "@/components/ui/textarea";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { createFileRoute } from "@tanstack/react-router";
// import { Minus, Plus, Save } from "lucide-react";
// import { ChangeEvent, FormEvent, useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_restaurateur/menu-manager")({
  component: () => "prout",
});

// const menuSchema = z.object({
//   name: z.string().min(3, { message: "Nom trop court (Minimum 3)." }),
//   description: z.string(),
//   image: z.any(),
//   price: z.coerce.number().refine((val) => val > 0, {
//     message: "Veuillez indiquer un prix pour votre produit.",
//   }),
// });

// function MenuManager() {
//   const [data, setData] = useState<CategoryContent[]>(categoryData);
//   const [displayCategory, setdisplayCategory] = useState<boolean>(false);
//   const [categoryName, setCategoryName] = useState("");
//   const form = useForm<z.infer<typeof menuSchema>>({
//     resolver: zodResolver(menuSchema),
//     defaultValues: {
//       name: "",
//       description: "",
//       image: "",
//       price: 0,
//     },
//   });

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setCategoryName(e.target.value);
//   };

//   const onCategorySubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (categoryName.trim() === "") return;

//     // get max category id
//     const newId = Math.max.apply(
//       Math,
//       data.map(function (o) {
//         return parseInt(o.category_id);
//       })
//     );
//     setData([
//       ...data,
//       {
//         category_name: categoryName,
//         category_id: (newId + 1).toString(),
//         items: [],
//       },
//     ]);
//     setdisplayCategory(false);
//   };

//   const onSubmit = async (values: z.infer<typeof menuSchema>) => {
//     console.log(values);
//   };

//   return (
//     <div className="h-full w-full">
//       <H1>Menu Manager</H1>
//       <div className="h-full w-full flex flex-col gap-4 pb-40 overflow-auto">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
//             <FormField
//               control={form.control}
//               name="name"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Menu Name</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="text"
//                       placeholder="Name"
//                       className="w-full"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="description"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Menu Description</FormLabel>
//                   <FormControl>
//                     <Textarea
//                       placeholder="Description"
//                       className="w-full"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="image"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Image</FormLabel>
//                   <FormControl>
//                     <Input
//                       type="file"
//                       accept="image/png, image/jpeg"
//                       placeholder="Select an image"
//                       {...field}
//                     />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="price"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Price</FormLabel>
//                   <FormControl>
//                     <Input type="number" placeholder="Price (€)" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <Button className="fixed bottom-14 w-[82%]" type="submit">
//               <Save />
//               Enregistrer
//             </Button>
//           </form>
//         </Form>
//         {data.map((testDataItem) => (
//           <div key={testDataItem.category_id}>
//             <Separator />
//             <CategoryManager category={testDataItem} allItemsList={itemsData} />
//           </div>
//         ))}
//         {displayCategory && (
//           <form onSubmit={onCategorySubmit}>
//             <div>
//               <p>Ajouter catégorie</p>
//               <div className="flex items-center justify-between">
//                 <Input
//                   name="category"
//                   type="text"
//                   placeholder="Category Name"
//                   className="w-4/5"
//                   value={categoryName}
//                   onChange={handleInputChange}
//                 />
//                 <Button className="flex gap-1" type="submit">
//                   <Plus />
//                 </Button>
//               </div>
//             </div>
//           </form>
//         )}

//         <Button
//           className="w-full flex gap-1"
//           variant="outline"
//           onClick={() => setdisplayCategory(!displayCategory)}
//         >
//           {!displayCategory && (
//             <>
//               <Plus />
//               Add Category
//             </>
//           )}
//           {displayCategory && (
//             <>
//               <Minus />
//               Annuler
//             </>
//           )}
//         </Button>
//       </div>
//     </div>
//   );
// }
