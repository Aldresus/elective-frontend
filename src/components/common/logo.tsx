import { cn } from "@/lib/utils";

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {}

export default function Logo({ className, ...props }: LogoProps) {
  return (
    <div className={cn("h-full", className)} {...props}>
      <div className="dark:hidden h-full">
        <img src="src/assets/cesieats_b_sm.png" alt="logo" className="h-full" />
      </div>
      <div className="hidden dark:block h-full">
        <img src="src/assets/cesieats_w_sm.png" alt="logo" className="h-full" />
      </div>
    </div>
  );
}
