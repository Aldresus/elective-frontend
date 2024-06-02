import { idInator } from "@/lib/utils";
import { Input } from "./input";

interface InputWithTextProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
}

export function InputWithText({
  label,
  id,
  description,
  ...props
}: InputWithTextProps) {
  id = id || idInator(label);

  return (
    <div className="grid w-full items-center gap-1.5">
      <div className="grid gap-1.5 leading-none">
        <label
          htmlFor={id}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
        <Input id={id} {...props} />
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
