import { useState, type ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";

type FlipCardProps = {
  front: ReactNode;
  back: ReactNode;
  label: string;
  className?: string;
};

const flipCard = tv({
  slots: {
    root: "relative rounded-xl perspective-[62.5rem] has-focus-visible:ring-2 has-focus-visible:ring-ring has-focus-visible:ring-offset-2 has-focus-visible:ring-offset-background",
    inner:
      "relative size-full transition-transform duration-500 ease-in-out transform-3d motion-reduce:transition-none",
    face: "absolute inset-0 overflow-hidden rounded-xl backface-hidden",
    backFace: "rotate-y-180",
    button: "absolute inset-0 z-10 cursor-pointer rounded-xl outline-none",
  },
  variants: {
    flipped: { true: { inner: "rotate-y-180" } },
  },
});

function FlipCard({
  front,
  back,
  label,
  className,
}: Readonly<FlipCardProps>): JSX.Element {
  const [flipped, setFlipped] = useState(false);
  const styles = flipCard({ flipped });

  return (
    <div className={styles.root({ class: className })}>
      <div className={styles.inner()}>
        <div className={styles.face()} aria-hidden={flipped}>
          {front}
        </div>
        <div
          className={styles.face({ class: styles.backFace() })}
          aria-hidden={!flipped}
        >
          {back}
        </div>
      </div>
      <button
        type="button"
        className={styles.button()}
        aria-label={label}
        aria-pressed={flipped}
        onClick={() => {
          setFlipped((current) => !current);
        }}
      />
    </div>
  );
}

export default FlipCard;
