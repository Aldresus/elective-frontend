import type { Menu } from "@/entities/menu";
import type { Product } from "@/entities/product";

export interface ProductCardProps extends React.HTMLProps<HTMLDivElement> {
  content: Menu | Product;
}
