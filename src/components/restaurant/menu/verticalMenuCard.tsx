import { useState } from "react";
import { VerticalItemCard } from "../primitives/verticalItemCard";
import { FullMenu, Menu } from "@/entities/menu";
import { MenuConfigModal } from "./menuConfigModal";
import { cn } from "@/lib/utils";

interface VerticalMenuCardProps extends React.HTMLProps<HTMLDivElement> {
  menuContent: Menu;
}

export function VerticalMenuCard({
  className,
  menuContent,
  ...props
}: VerticalMenuCardProps) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <MenuConfigModal
        menuContent={menuContent}
        open={open}
        close={() => {
          setOpen(false);
        }}
      />
      <VerticalItemCard
        onClick={() => setOpen(true)}
        addButton={false}
        cardDescription={menuContent.description}
        cardPrice={menuContent.price}
        cardTitle={menuContent.name}
        imgUrl={menuContent.menu_image_url}
        className={cn("cursor-pointer", className)}
        {...props}
      />
    </>
  );
}
