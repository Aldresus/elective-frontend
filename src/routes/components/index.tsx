import { createFileRoute } from "@tanstack/react-router";
import TypoExample from "./-typo";
import ButtonsExample from "./-buttons";
import InputsExample from "./-inputs";
import AccordionExample from "./-accordion";
import AvatarExample from "./-avatar";
import CardExample from "./-card";
import { H1, H2, H4 } from "@/components/typography";
import Navbar from "@/components/common/navbar";

export const Route = createFileRoute("/components/")({
  component: ComponentsComponent,
});

function ComponentsComponent() {
  return (
    <div className="flex flex-col w-full gap-2 min-h-screen p-[200px]">
      <H1 className="text-hungry-yellow-600">et ici les composants</H1>
      <H2 className="text-hungry-yellow-600">les primitives</H2>
      <TypoExample />
      <ButtonsExample />
      <InputsExample />
      <AccordionExample />
      <AvatarExample />
      <CardExample />
      <H2 className="text-hungry-yellow-600">les autres (jor plus avancés)</H2>
      <H4 className="text-hungry-yellow-500">Navbar prototypesque</H4>
      <Navbar />
    </div>
  );
}
