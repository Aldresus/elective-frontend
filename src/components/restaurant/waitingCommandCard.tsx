import { Check, X } from "lucide-react";
import { H3, H4, Large, Li, Ul } from "../typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Order } from "@/entities/order";

interface WaitingCommandCardProps extends React.HTMLAttributes<HTMLDivElement> {
  order: Order;
}

export default function WaitingCommandCard({
  order,
  ...props
}: WaitingCommandCardProps) {
  return (
    <Card className="space-y-4" {...props}>
      <CardHeader>
        <div className="flex items-end justify-between">
          {/* need to get it from ms */}
          <H3>Nom du client</H3>
          <H4>{order.price}€</H4>
        </div>
      </CardHeader>
      <CardContent>
        {order.menus.map((menu, i) => (
          <div
            key={`${menu.id_menu}${i}`}
            className="flex items-center justify-between"
          >
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <Large>{menu.name}</Large>
                </AccordionTrigger>
                <AccordionContent>
                  <Ul className="my-0">
                    {menu.products.map((product, i) => (
                      <Li key={`${product.id_product}${i}`}>{product.name}</Li>
                    ))}
                  </Ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Large className="pl-8">{menu.price}€</Large>
          </div>
        ))}

        {order.products.map((product) => (
          <div
            key={product.id_product}
            className="flex items-center justify-between"
          >
            <Large>{product.name}</Large>
            <Large className="pl-8">{product.price}€</Large>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex items-center justify-around">
        <Button className="bg-green-500 hover:bg-green-600 text-white">
          <Check />
        </Button>
        <Button variant="destructive">
          <X />
        </Button>
      </CardFooter>
    </Card>
  );
}
