import { idInator } from "@/lib/utils";
import { Textarea } from "./textarea";

interface TextareaWithTextProps
  extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
}

export function TextareaWithText({
  label,
  id,
  description,
  ...props
}: TextareaWithTextProps) {
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
        <Textarea id={id} {...props} />
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
