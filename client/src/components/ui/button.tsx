import { Button as ButtonPrimitive } from "@base-ui/react/button";
import type { VariantProps } from "tailwind-variants/lite";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button-variants";
import type { JSX } from "react/jsx-runtime";

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>): JSX.Element {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={(state) =>
        cn(
          buttonVariants({ variant, size }),
          typeof className === "function" ? className(state) : className,
        )
      }
      {...props}
    />
  );
}

export { Button };
