import { lazy, Suspense } from "react";
import { ErrorBoundary } from "@sentry/react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/types/project.ts";
import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import { useMediaQuery } from "@/hooks/use-media-query";
// TEMP: trying out the Lanyard. Remove or move once decided.
const lanyardFrame = tv({ base: "h-150 w-full" });
const Lanyard = lazy(() => import("@/components/lanyard"));

// TEMP: placeholder content to test page scrolling. Remove.
const placeholder = tv({ base: "mx-auto max-w-prose space-y-4 px-4 py-8" });
const loremIpsum =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.";

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
  if (!res.ok) {
    throw new Error(`Request failed: ${String(res.status)}`);
  }
  return (await res.json()) as Project[];
}

function ProjectList(): JSX.Element {
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isPending) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((project) => (
        <li key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </li>
      ))}
    </ul>
  );
}

function HomePage(): JSX.Element {
  const isDesktop = useMediaQuery("(min-width: 64rem)");

  return (
    <>
      {isDesktop && (
        <div className={lanyardFrame()}>
          <ErrorBoundary fallback={<div />}>
            <Suspense fallback={null}>
              <Lanyard frontImage="lanyard_image.webp" />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
      <ProjectList />
      <div className={placeholder()}>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i}>{loremIpsum}</p>
        ))}
      </div>
    </>
  );
}

export default HomePage;
