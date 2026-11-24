// Copyright (c) 2026 David Haz
// Licensed under MIT + Commons Clause: https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md

import { useEffect, useId, useRef, type JSX, type ReactNode } from "react";
import { tv } from "tailwind-variants/lite";
import { cn } from "@/lib/utils";

// Adapted from React Bits' Glass Surface, trimmed to a pill for the footer: the SVG
// displacement filter (Chromium) and the frosted fallback (Safari, Firefox). The WebGL
// renderer and the shape and backdrop props were removed. No pure white, rem units.

type GlassSurfaceProps = {
  children?: ReactNode;
  className?: string;
};

const BORDER_WIDTH = 0.07;
const BRIGHTNESS = 50;
const OPACITY = 0.93;
const BLUR = 11;
const DISPLACE = 0.5;
const DISTORTION_SCALE = -180;
const RED_OFFSET = 0;
const GREEN_OFFSET = 10;
const BLUE_OFFSET = 20;

// Chromium is the only engine that applies an SVG filter through backdrop-filter.
const supportsSvgBackdrop = (): boolean => {
  const { userAgent } = navigator;
  const isWebkit =
    userAgent.includes("Safari") && !userAgent.includes("Chrome");
  const isFirefox = userAgent.includes("Firefox");
  if (isWebkit || isFirefox) return false;
  const probe = document.createElement("div");
  probe.style.backdropFilter = "url(#probe)";
  return probe.style.backdropFilter !== "";
};

const REFRACTIVE = supportsSvgBackdrop();

// The map is drawn in the pill's measured CSS pixels, because the filter works in
// pixels. Its colours are displacement data (red = x, blue = y), not visible colours.
const displacementMap = (width: number, height: number): string => {
  const w = String(width);
  const h = String(height);
  const radius = String(height / 2);
  const edge = Math.min(width, height) * BORDER_WIDTH * 0.5;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stop-color="#0000"/>
        <stop offset="100%" stop-color="red"/>
      </linearGradient>
      <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0000"/>
        <stop offset="100%" stop-color="blue"/>
      </linearGradient>
      <filter id="soft" filterUnits="userSpaceOnUse" x="0" y="0" width="${w}" height="${h}" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="${String(BLUR)}"/>
      </filter>
    </defs>
    <rect x="0" y="0" width="${w}" height="${h}" fill="black"/>
    <rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" fill="url(#red)"/>
    <rect x="0" y="0" width="${w}" height="${h}" rx="${radius}" fill="url(#blue)" style="mix-blend-mode: difference"/>
    <rect x="${String(edge)}" y="${String(edge)}" width="${String(width - edge * 2)}" height="${String(height - edge * 2)}" rx="${radius}" fill="hsl(0 0% ${String(BRIGHTNESS)}% / ${String(OPACITY)})" filter="url(#soft)"/>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

const glassSurface = tv({
  slots: {
    root: "relative flex items-center justify-center overflow-hidden rounded-full",
    filter: "pointer-events-none absolute inset-0 -z-10 size-full opacity-0",
    sheen:
      "pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,light-dark(color-mix(in_oklch,var(--color-neutral-50)_42%,transparent),color-mix(in_oklch,var(--color-neutral-50)_14%,transparent))_0%,transparent_42%,transparent_64%,light-dark(color-mix(in_oklch,var(--color-neutral-50)_18%,transparent),color-mix(in_oklch,var(--color-neutral-50)_5%,transparent))_100%)]",
    rim: [
      "pointer-events-none absolute inset-0 rounded-[inherit] p-0.75",
      "bg-[linear-gradient(150deg,light-dark(color-mix(in_oklch,var(--color-neutral-50)_70%,transparent),color-mix(in_oklch,var(--color-neutral-50)_34%,transparent)),light-dark(color-mix(in_oklch,var(--color-neutral-50)_10%,transparent),color-mix(in_oklch,var(--color-neutral-50)_3%,transparent))_45%,light-dark(color-mix(in_oklch,var(--color-neutral-50)_8%,transparent),color-mix(in_oklch,var(--color-neutral-50)_2%,transparent))_60%,light-dark(color-mix(in_oklch,var(--color-neutral-50)_42%,transparent),color-mix(in_oklch,var(--color-neutral-50)_18%,transparent)))]",
      "[mask:linear-gradient(#000_0_0)_content-box,linear-gradient(#000_0_0)] mask-exclude",
    ],
    content:
      "relative z-1 flex size-full items-center justify-center rounded-[inherit] p-2",
  },
  variants: {
    mode: {
      refractive: {
        root: [
          "bg-neutral-50/10 dark:bg-neutral-950/10",
          "[box-shadow:inset_0_0_0.125rem_0.0625rem_light-dark(color-mix(in_oklch,black,transparent_85%),color-mix(in_oklch,var(--color-neutral-50),transparent_65%)),inset_0_0_0.625rem_0.25rem_light-dark(color-mix(in_oklch,black,transparent_90%),color-mix(in_oklch,var(--color-neutral-50),transparent_85%)),0_0.25rem_1rem_rgb(17_17_26/0.05),0_0.5rem_1.5rem_rgb(17_17_26/0.05),0_1rem_3.5rem_rgb(17_17_26/0.05),inset_0_0.25rem_1rem_rgb(17_17_26/0.05),inset_0_0.5rem_1.5rem_rgb(17_17_26/0.05),inset_0_1rem_3.5rem_rgb(17_17_26/0.05)]",
        ],
      },
      frosted: {
        root: [
          "bg-neutral-50/17 backdrop-blur-md backdrop-brightness-104 backdrop-saturate-140 dark:bg-neutral-50/7",
          "[box-shadow:inset_0_0.0625rem_0_0_light-dark(color-mix(in_oklch,var(--color-neutral-50)_85%,transparent),color-mix(in_oklch,var(--color-neutral-50)_30%,transparent)),inset_0_-0.0625rem_0_0_light-dark(color-mix(in_oklch,var(--color-neutral-50)_35%,transparent),color-mix(in_oklch,var(--color-neutral-50)_8%,transparent)),inset_0_0_0.125rem_0.0625rem_light-dark(color-mix(in_oklch,black,transparent_88%),color-mix(in_oklch,var(--color-neutral-50),transparent_72%)),inset_0_0_0.75rem_0.1875rem_light-dark(color-mix(in_oklch,var(--color-neutral-50),transparent_72%),color-mix(in_oklch,var(--color-neutral-50),transparent_90%)),0_0.25rem_1rem_rgb(17_17_26/0.06),0_0.5rem_1.5rem_rgb(17_17_26/0.06),0_1rem_3.5rem_rgb(17_17_26/0.06)]",
        ],
      },
    },
  },
});
const styles = glassSurface({ mode: REFRACTIVE ? "refractive" : "frosted" });

function GlassSurface({
  children,
  className,
}: Readonly<GlassSurfaceProps>): JSX.Element {
  const filterId = `glass-filter-${useId().replaceAll(/[^\w-]/g, "")}`;
  const rootRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<SVGFEImageElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    const map = mapRef.current;
    if (!root || !map) return;
    let alive = true;
    let raf = 0;
    const observer = new ResizeObserver(() => {
      const url = displacementMap(root.offsetWidth, root.offsetHeight);
      const image = new Image();
      image.src = url;
      void image
        .decode()
        .then(() => {
          if (!alive) return;
          map.setAttribute("href", url);
          // Chrome doesn't redraw a backdrop-filter when its feImage loads, so the
          // glass stayed blank until a click forced a repaint. Re-applying it does.
          root.style.backdropFilter = "none";
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            root.style.backdropFilter = `url(#${filterId})`;
          });
        })
        .catch(() => undefined);
    });
    observer.observe(root);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [filterId]);

  return (
    <div
      ref={rootRef}
      className={cn(styles.root(), className)}
      style={REFRACTIVE ? { backdropFilter: `url(#${filterId})` } : undefined}
    >
      {REFRACTIVE ? (
        <svg aria-hidden="true" className={styles.filter()}>
          <defs>
            <filter
              id={filterId}
              colorInterpolationFilters="sRGB"
              x="0%"
              y="0%"
              width="100%"
              height="100%"
            >
              <feImage
                ref={mapRef}
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                result="map"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={DISTORTION_SCALE + RED_OFFSET}
                xChannelSelector="R"
                yChannelSelector="G"
                result="dispRed"
              />
              <feColorMatrix
                in="dispRed"
                type="matrix"
                values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="red"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={DISTORTION_SCALE + GREEN_OFFSET}
                xChannelSelector="R"
                yChannelSelector="G"
                result="dispGreen"
              />
              <feColorMatrix
                in="dispGreen"
                type="matrix"
                values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0"
                result="green"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale={DISTORTION_SCALE + BLUE_OFFSET}
                xChannelSelector="R"
                yChannelSelector="G"
                result="dispBlue"
              />
              <feColorMatrix
                in="dispBlue"
                type="matrix"
                values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0"
                result="blue"
              />
              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur in="output" stdDeviation={DISPLACE} />
            </filter>
          </defs>
        </svg>
      ) : (
        <>
          <span aria-hidden="true" className={styles.sheen()} />
          <span aria-hidden="true" className={styles.rim()} />
        </>
      )}
      <div className={styles.content()}>{children}</div>
    </div>
  );
}

export default GlassSurface;
