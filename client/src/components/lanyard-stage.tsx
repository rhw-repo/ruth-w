import { lazy, Suspense, useEffect, useState, type JSX } from "react";
import { ErrorBoundary } from "@sentry/react";
import { tv } from "tailwind-variants/lite";
import { cn } from "@/lib/utils";

const Lanyard = lazy(() => import("@/components/lanyard"));

const stage = tv({
  slots: {
    root: "relative",
    lanyard:
      "h-full transition-opacity duration-700 ease-out motion-reduce:transition-none",
  },
  variants: {
    ready: {
      true: { lanyard: "opacity-100" },
      false: { lanyard: "opacity-0" },
    },
  },
});

type LanyardStageProps = {
  className?: string;
};

function OnMounted({ onReady }: Readonly<{ onReady: () => void }>): null {
  useEffect(() => {
    const id = requestAnimationFrame(onReady);
    return () => {
      cancelAnimationFrame(id);
    };
  }, [onReady]);
  return null;
}

function LanyardStage({ className }: Readonly<LanyardStageProps>): JSX.Element {
  const [ready, setReady] = useState(false);
  const styles = stage({ ready });

  return (
    <div className={cn(styles.root(), className)}>
      <div className={styles.lanyard()}>
        <ErrorBoundary fallback={<div />}>
          <Suspense fallback={null}>
            <Lanyard
              frontImage="/lanyard_image.webp"
              cardColor="#fafafa"
              name="Ruth Westnidge"
              role="Software Developer"
              anchor="center"
              size={0.75}
              strapLength={0.15}
              strapColor="#8a3b25"
            />
            <OnMounted
              onReady={() => {
                setReady(true);
              }}
            />
          </Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default LanyardStage;
