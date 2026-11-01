import type { ComponentProps } from "react";
import type { JSX } from "react/jsx-runtime";
import { cn } from "@/lib/utils";
import { cardVariants } from "@/components/ui/card-variants";

const styles = cardVariants();

function Card({
  className,
  size = "default",
  ...props
}: ComponentProps<"div"> & { size?: "default" | "sm" }): JSX.Element {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(styles.root(), className)}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-header"
      className={cn(styles.header(), className)}
      {...props}
    />
  );
}

function CardTitle({
  className,
  level = 3,
  ...props
}: ComponentProps<"h3"> & { level?: 1 | 2 | 3 | 4 }): JSX.Element {
  const Heading = `h${String(level)}` as "h1" | "h2" | "h3" | "h4";
  return (
    <Heading
      data-slot="card-title"
      className={cn(styles.title(), className)}
      {...props}
    />
  );
}

function CardDescription({
  className,
  ...props
}: ComponentProps<"p">): JSX.Element {
  return (
    <p
      data-slot="card-description"
      className={cn(styles.description(), className)}
      {...props}
    />
  );
}

function CardAction({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-action"
      className={cn(styles.action(), className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-content"
      className={cn(styles.content(), className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: ComponentProps<"div">): JSX.Element {
  return (
    <div
      data-slot="card-footer"
      className={cn(styles.footer(), className)}
      {...props}
    />
  );
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};
