import { H2, Large, Small } from "@/components/typography";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MenuCategory } from "@/entities/menu";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormControl, FormItem, FormMessage } from "@/components/ui/form";
import { ControllerRenderProps } from "react-hook-form";

interface MenuCategoryProps extends React.HTMLProps<HTMLDivElement> {
  category: MenuCategory;
  bottomDivider?: boolean;
  field?: ControllerRenderProps<
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      [x: string]: any;
    },
    string
  >;
}

export function MenuCategoryProducts({
  category,
  className,
  bottomDivider = true,
  field,
  ...props
}: MenuCategoryProps) {
  return (
    <div className={cn("rounded-lg space-y-4", className)} {...props}>
      <div className="-space-y-2">
        <H2>{category.name}</H2>
        <FormMessage />
      </div>
      <RadioGroup
        // defaultValue={category.Product[0].id_product}
        onValueChange={(value) => field?.onChange(value)}
        value={field?.value}
        className="space-y-2"
      >
        {category.Product.map((product) => (
          <FormItem
            key={product.id_product}
            className="flex items-center justify-between"
          >
            <Label htmlFor={product.id_product}>
              <div>
                <Large>{product.name}</Large>
                <Small>{product.description}</Small>
              </div>
            </Label>
            <FormControl>
              <RadioGroupItem
                id={product.id_product}
                value={product.id_product}
              />
            </FormControl>
          </FormItem>
        ))}
      </RadioGroup>
      {bottomDivider && <Separator />}
    </div>
  );
}
