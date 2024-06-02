import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionExample() {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="text-accent">Les accordions</div>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Est-ce que j'accordéone ?</AccordionTrigger>
          <AccordionContent>Je crois que oui</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Et toi, ça accordéone ?</AccordionTrigger>
          <AccordionContent>super, ça m'intéresse</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Ouai ouai ouai</AccordionTrigger>
          <AccordionContent>Super l'Accordion en tout cas</AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
