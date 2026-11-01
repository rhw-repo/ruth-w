import { lazy, Suspense } from "react";
import { ErrorBoundary } from "@sentry/react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/types/project.ts";
import type { Profile } from "@/types/profile.ts";
import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import { useMediaQuery } from "@/hooks/use-media-query";
import IntroCard from "@/components/intro-card";

// The Lanyard's column runs from the screen's left edge, to give it room to swing.
// The card is only as wide as it needs, up to 28rem, and its right edge lines up with
// the navbar's contents (max-w-5xl + px-4): 50% - 32rem + 1rem from the right.
const hero = tv({
  slots: {
    root: "flex items-center gap-8 px-4 lg:pr-[max(1rem,calc(50%-31rem))] lg:pl-0",
    lanyardFrame: "relative z-2 h-150 min-w-0 flex-1",
    intro: "flex-1 lg:max-w-md lg:flex-none",
  },
});
const heroStyles = hero();

const section = tv({ base: "mx-auto max-w-5xl px-4" });

const Lanyard = lazy(() => import("@/components/lanyard"));

// TEMP: placeholder content to test page scrolling. Remove.
const placeholder = tv({ base: "space-y-4 py-8" });
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
    <ul className={section()}>
      {data.map((project) => (
        <li key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </li>
      ))}
    </ul>
  );
}

async function fetchProfile(): Promise<Profile> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`);
  if (!res.ok) {
    throw new Error(`Request failed: ${String(res.status)}`);
  }
  return (await res.json()) as Profile;
}

function Hero(): JSX.Element {
  const isDesktop = useMediaQuery("(min-width: 64rem)");
  const { data: profile, error } = useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });

  let intro: JSX.Element | null = null;
  if (profile) {
    intro = (
      <IntroCard
        name={profile.name}
        role={profile.role}
        stack={profile.stack}
      />
    );
  } else if (error) {
    intro = <p>Couldn't load the profile.</p>;
  }

  // The Lanyard doesn't wait for the API, so its caption is set here.
  return (
    <section className={heroStyles.root()}>
      {isDesktop && (
        <div className={heroStyles.lanyardFrame()}>
          <ErrorBoundary fallback={<div />}>
            <Suspense fallback={null}>
              <Lanyard
                frontImage="lanyard_image.webp"
                name="Ruth Westnidge"
                role="Software Developer"
                anchor="right"
              />
            </Suspense>
          </ErrorBoundary>
        </div>
      )}
      <div className={heroStyles.intro()}>{intro}</div>
    </section>
  );
}

function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <ProjectList />
      <div className={section({ class: placeholder() })}>
        {Array.from({ length: 12 }, (_, i) => (
          <p key={i}>{loremIpsum}</p>
        ))}
      </div>
    </>
  );
}

export default HomePage;
