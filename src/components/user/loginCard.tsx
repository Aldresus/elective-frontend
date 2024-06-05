import { cn } from "@/lib/utils";

interface LoginCardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginCard({ className, children, ...props }: LoginCardProps) {
  return (
    <div
      className={cn("bg-white p-4 rounded-lg shadow-md w-[500px]", className)}
      {...props}
    >
      <img
        className="max-h-[150px] w-full object-cover rounded"
        src="/src/assets/test/test.webp"
        alt="restaurant"
      />
      {children}
    </div>
  );
}
