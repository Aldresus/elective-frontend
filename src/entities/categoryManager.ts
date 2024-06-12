import type { Menu } from "./menu";
import type { Product } from "./product";

interface CategoryManager {
  category_name: string;
  category_id: string;
  items: Array<Menu | Product>;
}
