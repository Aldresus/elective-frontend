import { useState } from "react";
import { Menu } from "@/entities/menu";
import { MenuConfigModal } from "./menuConfigModal";
import { HorizontalItemCard } from "../primitives/horizontalItemCard";
import { cn } from "@/lib/utils";

interface HorizontalMenuCardProps extends React.HTMLProps<HTMLDivElement> {
  menuContent: Menu;
}

export function HorizontalMenuCard({
  className,
  menuContent,
  ...props
}: HorizontalMenuCardProps) {
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
      <HorizontalItemCard
        onClick={() => setOpen(true)}
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
