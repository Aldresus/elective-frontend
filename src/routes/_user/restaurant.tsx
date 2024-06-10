import { ProductCard } from "@/components/restaurant/productCard";
import { H1, H2 } from "@/components/typography";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_user/restaurant")({
  component: Restaurant,
});

function Restaurant() {
  return (
    <div className="space-y-6 w-full">
      <img
        className="w-full h-[200px] object-cover rounded-[20px]"
        src="/src/assets/test/test.webp"
        alt="restaurant"
      />
      <H1 className="text-center">La mie tah caline</H1>
      <div>
        <H2>Nos best-sellers</H2>
        <ProductCard />
      </div>
    </div>
  );
}
