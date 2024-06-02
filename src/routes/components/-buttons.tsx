import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Pencil } from "lucide-react";

export default function ButtonsExample() {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="text-accent">Les boutons</div>
      <div>
        <div className="flex gap-2">
          variants <Button>default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link" asChild>
            <Link to="/components">Link</Link>
          </Button>
          <Button variant="outline">Outline</Button>
          <Button className="flex gap-1" variant="outline">
            <Pencil />
            Avec icone
          </Button>
        </div>
      </div>

      <div>
        <div className="flex gap-2">
          sizes <Button>default</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button size="icon">
            <Pencil />
          </Button>
        </div>
      </div>
    </div>
  );
}
