import { cn } from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: string;
}

interface BlockquoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  children: string;
}

interface UlProps extends React.HTMLAttributes<HTMLUListElement> {
  children: string;
}

interface LiProps extends React.HTMLAttributes<HTMLLIElement> {
  children: string;
}

function H1({ children, className, ...props }: HeadingProps) {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
}

function H2({ children, className, ...props }: HeadingProps) {
  return (
    <h2
      className={cn(
        "scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ children, className, ...props }: HeadingProps) {
  return (
    <h3
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
}

function H4({ children, className, ...props }: HeadingProps) {
  return (
    <h4
      className={cn(
        "scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
}

function Blockquote({ children, className, ...props }: BlockquoteProps) {
  return (
    <blockquote
      className={cn("mt-6 border-l-2 pl-6 italic", className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}

function Ul({ children, className, ...props }: UlProps) {
  return (
    <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
      {children}
    </ul>
  );
}

function Li({ children, ...props }: LiProps) {
  return <li {...props}>{children}</li>;
}

export { H1, H2, H3, H4, Blockquote, Ul, Li };
