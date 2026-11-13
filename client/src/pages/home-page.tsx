import { lazy, Suspense } from "react";
import { ErrorBoundary } from "@sentry/react";
import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/types/project.ts";
import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import { useProfile } from "@/hooks/use-profile";
import SkillsSection from "@/components/skills-section";
import SkillIconRow from "@/components/skill-icon-row";
import ProjectCard from "@/components/project-card";
import AboutSection from "@/components/about-section";
import ContactSection from "@/components/contact-section";

// From lg: the Lanyard (60%) beside About (40%), then the name with the role full width
// underneath. Below lg, one column: Lanyard, skill logos, name and role, then About.
// The name row (h1) comes first in the DOM, so it precedes About's h2 for screen readers;
// order classes place it visually.
// Below lg, `top` is display: contents, so its children join the hero's grid and can be
// ordered around the name row.
// The hero is a size container, so the name's cqi font size scales with the container's width.
const hero = tv({
  slots: {
    container:
      "@container mx-auto grid max-w-5xl gap-8 px-4 pt-0 pb-4 md:py-12 lg:py-12",
    nameRow:
      "col-span-full flex flex-col items-center gap-2 max-lg:order-3 md:flex-row md:items-baseline md:justify-center md:gap-6 lg:order-last",
    name: "font-heading text-[10cqi] leading-none font-semibold tracking-tight whitespace-nowrap text-headline md:text-[8cqi]",
    role: "text-xl whitespace-nowrap text-foreground",
    // TRIAL (2026-11-13): Lanyard on mobile too, to measure performance. The previous
    // version showed a plain <img> of the photo below lg instead.
    top: "contents lg:grid lg:grid-cols-[3fr_2fr] lg:items-center lg:gap-8",
    lanyardFrame: "relative z-2 h-80 max-lg:order-1",
    // Mobile only: the skill logos under the Lanyard (the navbar shows them from lg).
    skills: "justify-center max-lg:order-2 lg:hidden",
    about: "max-lg:order-4",
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

function Hero(): JSX.Element {
  const { data: profile } = useProfile();

  // The Lanyard, name and role don't wait for the API, so they're set here. The name is
  // likely the page's LCP element, and the role sits beside it, so neither waits for a request.
  return (
    <section className={heroStyles.container()}>
      <div className={heroStyles.nameRow()}>
        <h1 className={heroStyles.name()}>Ruth Westnidge</h1>
        <p className={heroStyles.role()}>Software Developer</p>
      </div>
      <div className={heroStyles.top()}>
        <div className={heroStyles.lanyardFrame()}>
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
            </Suspense>
          </ErrorBoundary>
        </div>
        <SkillIconRow className={heroStyles.skills()} />
        <div className={heroStyles.about()}>
          <AboutSection links={profile?.links ?? []} />
        </div>
      </div>
    </section>
  );
}

function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <ProjectList />
      <SkillsSection />
      <ContactSection />
    </>
  );
}

export default HomePage;
