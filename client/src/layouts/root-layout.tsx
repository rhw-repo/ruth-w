import type { JSX } from "react";
import { Outlet } from "react-router";
import { tv } from "tailwind-variants/lite";
import Navbar from "@/components/navbar.tsx";

const gridBackground = tv({
  base: "pointer-events-none fixed inset-0 -z-10 bg-[linear-gradient(to_right,color-mix(in_oklab,var(--color-zinc-800)_10%,transparent)_0.0625rem,transparent_0.0625rem),linear-gradient(to_bottom,color-mix(in_oklab,var(--color-zinc-800)_60%,transparent)_0.0625rem,transparent_0.0625rem)] bg-size-[2.5rem_2.5rem] mask-[radial-gradient(ellipse_at_center,black_40%,transparent_80%)]",
});

function RootLayout(): JSX.Element {
  return (
    <>
      <div aria-hidden="true" className={gridBackground()} />
      <Navbar />
      <main id="main-content">
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
