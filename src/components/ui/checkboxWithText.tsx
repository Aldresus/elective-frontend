import { Checkbox } from "@/components/ui/checkbox";
import { idInator } from "@/lib/utils";

interface CheckboxWithTextProps {
  label: string;
  description?: string;
  id?: string;
  onCheckedChange: (checked: boolean) => void;
}

export function CheckboxWithText({
  label,
  id,
  description,
  onCheckedChange,
}: CheckboxWithTextProps) {
  id = id || idInator(label);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} onCheckedChange={onCheckedChange} />
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
