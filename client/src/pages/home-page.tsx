import { lazy, Suspense } from "react";
import { ErrorBoundary } from "@sentry/react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/types/project.ts";
import type { Profile } from "@/types/profile.ts";
import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import { useMediaQuery } from "@/hooks/use-media-query";
import IntroCard from "@/components/intro-card";
import ProjectCard from "@/components/project-card";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";

// The container shares the page's max width: the Lanyard (desktop only) above About on
// the left, the intro card on the right.
// The intro card comes first in the DOM so the h1 precedes About's h2.
const hero = tv({
  slots: {
    container:
      "mx-auto grid max-w-5xl gap-8 px-4 py-4 md:py-12 lg:py-12 lg:grid-cols-2",
    about: "lg:col-start-1 lg:row-start-1",
    intro: "lg:col-start-2 lg:row-start-1 lg:justify-self-end",
    lanyardFrame: "relative z-2 h-80",
  },
});
const heroStyles = hero();

const projects = tv({
  slots: {
    root: "mx-auto max-w-5xl px-4 py-12",
    heading: "mb-6 text-xs tracking-wide text-headline uppercase",
    grid: "grid gap-8 sm:grid-cols-2 lg:grid-cols-3",
  },
});
const projectStyles = projects();

const Lanyard = lazy(() => import("@/components/lanyard"));

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
    <section
      aria-labelledby="projects-heading"
      className={projectStyles.root()}
    >
      <h2 id="projects-heading" className={projectStyles.heading()}>
        Projects
      </h2>
      <ul className={projectStyles.grid()}>
        {data.map((project) => (
          <li key={project._id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
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
    intro = <IntroCard name={profile.name} role={profile.role} />;
  } else if (error) {
    intro = <p>Couldn't load the profile.</p>;
  }

  // The Lanyard doesn't wait for the API, so its caption is set here.
  return (
    <section className={heroStyles.container()}>
      <div className={heroStyles.intro()}>{intro}</div>
      <div className={heroStyles.about()}>
        {isDesktop && (
          <div className={heroStyles.lanyardFrame()}>
            <ErrorBoundary fallback={<div />}>
              <Suspense fallback={null}>
                <Lanyard
                  frontImage="lanyard_image.webp"
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
              </Suspense>
            </ErrorBoundary>
          </div>
        )}
        <AboutSection links={profile?.links ?? []} />
      </div>
    </section>
  );
}

function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <ProjectList />
      <ContactSection />
    </>
  );
}

export default HomePage;
