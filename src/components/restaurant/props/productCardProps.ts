export interface ProductCardProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  imageUrl: string;
  description?: string;
  price: number;
}
