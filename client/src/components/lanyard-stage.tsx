import { lazy, Suspense, useEffect, useState, type JSX } from "react";
import { ErrorBoundary } from "@sentry/react";
import { tv } from "tailwind-variants/lite";
import { cn } from "@/lib/utils";

const Lanyard = lazy(() => import("@/components/lanyard"));

// Reserves the Lanyard's space (its height comes from the className passed in), then
// starts loading it once the page has loaded and the browser is idle, on every width.
// Loaded straight away, three.js added ~240 ms of Total Blocking Time on mobile.
// The Lanyard fades in once it has drawn its first frame.
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

// Calls onReady on the frame after it mounts. It sits after the Lanyard inside Suspense,
// so by then the Lanyard has mounted and drawn its first frame.
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
  const [idle, setIdle] = useState(false);
  const [ready, setReady] = useState(false);

  // Wait for the load event, then for the browser to be idle.
  useEffect(() => {
    // TypeScript's DOM types say requestIdleCallback always exists, but Safari doesn't
    // have it, so it's typed as optional here.
    const idleWindow: {
      requestIdleCallback?: Window["requestIdleCallback"];
      cancelIdleCallback?: Window["cancelIdleCallback"];
    } = window;
    let idleId = 0;
    let timeoutId = 0;
    const begin = (): void => {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(
          () => {
            setIdle(true);
          },
          { timeout: 2000 },
        );
      } else {
        timeoutId = window.setTimeout(() => {
          setIdle(true);
        }, 200);
      }
    };
    if (document.readyState === "complete") begin();
    else window.addEventListener("load", begin, { once: true });
    return () => {
      window.removeEventListener("load", begin);
      if (idleId) idleWindow.cancelIdleCallback?.(idleId);
      window.clearTimeout(timeoutId);
    };
  }, []);

  const styles = stage({ ready });

  return (
    <div className={cn(styles.root(), className)}>
      {idle && (
        <div className={styles.lanyard()}>
          <ErrorBoundary fallback={<div />}>
            <Suspense fallback={null}>
              <Lanyard
                frontImage="/lanyard_image.webp"
                cardColor="#fafafa"
                name="Ruth Westnidge"
                role="Software Developer"
                captionColor="var(--badge)"
                captionTextColor="var(--badge-foreground)"
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
      )}
    </div>
  );
}

export default LanyardStage;
