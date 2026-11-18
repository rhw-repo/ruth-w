import type { ComponentType, JSX, ReactNode } from "react";
import { tv } from "tailwind-variants/lite";
import { cn } from "@/lib/utils";
import ExpressIcon from "@/components/icons/express-icon";

type IconProps = { className?: string };

type WordmarkOptions = {
  font?: "helvetica" | "system";
  mark?: ReactNode;
};

const wordmark = tv({
  base: "flex max-w-none items-center gap-[0.3em] text-xs leading-none whitespace-nowrap",
  variants: {
    font: {
      helvetica: "font-['Helvetica_Neue',Helvetica,Arial,sans-serif]",
      system: "font-[system-ui,sans-serif]",
    },
  },
  defaultVariants: {
    font: "helvetica",
  },
});

export function createWordmark(
  text: string,
  { font, mark }: WordmarkOptions = {},
): ComponentType<IconProps> {
  function Wordmark({ className }: Readonly<IconProps>): JSX.Element {
    return (
      <span aria-hidden="true" className={cn(className, wordmark({ font }))}>
        {mark}
        {text}
      </span>
    );
  }
  return Wordmark;
}

export const expressMark = <ExpressIcon className="size-[1.2em] shrink-0" />;

export const bcryptMark = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[1.2em] shrink-0">
    <rect
      x="0.5"
      y="0.5"
      width="23"
      height="23"
      rx="5"
      className="fill-zinc-50"
    />
    <path
      d="M8 9C8 3.5 16 3.5 16 9M8 19l-1 2.5M16 19l1 2.5"
      fill="none"
      stroke="#3FA592"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M12 7l6 3.5v6.5l-6 3.5-6-3.5v-6.5z" fill="#3FA592" />
    <path
      d="M12 11v5.5M9.6 12.4l4.8 2.75M9.6 15.1l4.8-2.75"
      fill="none"
      className="stroke-zinc-50"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
);

export const expressValidatorMark = (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="size-[1.2em] shrink-0">
    <circle cx="11" cy="13" r="11" fill="#9A00FF" />
    <path
      d="M5 13.5l5 4.5L20 6"
      fill="none"
      className="stroke-zinc-50"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
