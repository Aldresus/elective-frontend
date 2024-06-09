import { Check, X } from "lucide-react";
import { H3, Large, Li, Ul } from "../typography";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function WaitingCommandCard() {
  return (
    <div className="rounded-[20px] bg-slate-100 p-4 pb-0">
      <div className="flex items-center justify-between">
        <H3>Nom du client</H3>
        <H3>30.52€</H3>
      </div>
      <div className="flex items-center justify-between">
        <Accordion type="single" collapsible className="flex-1">
          <AccordionItem value="item-1">
            <AccordionTrigger className="py-1">Menu A</AccordionTrigger>
            <AccordionContent>
              <Ul className="my-0">
                <Li>Produit A</Li>
                <Li>Produit B</Li>
                <Li>Produit C</Li>
              </Ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        <Large className="pl-8">15.65€</Large>
      </div>
      <div className="flex items-center justify-between">
        <Large>Produit A</Large>
        <Large className="pl-8">7.84€</Large>
      </div>
      <div className="flex items-center justify-between">
        <Large>Produit B</Large>
        <Large className="pl-8">8.25€</Large>
      </div>
      <div className="flex items-center p-2">
        <Check className="flex-1 hover:text-hungry-yellow-500" />
        <X className="flex-1 hover:text-hungry-yellow-500" />
      </div>
    </div>
  );
}
