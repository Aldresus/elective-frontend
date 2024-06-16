import { H2, H3, H4, Large, Small } from "@/components/typography";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { MenuCategory } from "@/entities/menu";
import { cn } from "@/lib/utils";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface MenuCategoryProps extends React.HTMLProps<HTMLDivElement> {
  category: MenuCategory;
  bottomDivider?: boolean;
}

export function MenuCategoryProducts({
  category,
  className,
  bottomDivider = true,
  ...props
}: MenuCategoryProps) {
  return (
    <div className={cn("rounded-lg space-y-4", className)} {...props}>
      <H2>{category.name}</H2>
      <RadioGroup
        defaultValue={category.Product[0].id_product}
        className="space-y-2"
      >
        {category.Product.map((product) => (
          <div
            key={product.id_product}
            className="flex items-center justify-between"
          >
            <Label htmlFor={product.id_product}>
              <div>
                <Large>{product.name}</Large>
                <Small>{product.description}</Small>
              </div>
            </Label>
            <RadioGroupItem
              id={product.id_product}
              value={product.id_product}
            />
          </div>
        ))}
      </RadioGroup>
      {bottomDivider && <Separator />}
    </div>
  );
}
