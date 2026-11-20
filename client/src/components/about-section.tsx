import type { JSX } from "react";
import { tv } from "tailwind-variants/lite";
import SpecularLink from "@/components/specular-link";
import type { ProfileLink } from "@/types/profile.ts";

type AboutSectionProps = {
  links: ProfileLink[];
};

const about = tv({
  slots: {
    // Visually hidden: the layout makes it clear this is the intro, but screen reader
    // users navigating by headings still need it to find the section.
    heading: "sr-only",
    // Centred below lg, where the hero is one centred column. With hero-split (phones in
    // landscape, tablets in portrait; see index.css) About sits beside the Lanyard, so
    // it's left-aligned like desktop.
    body: "mb-6 max-w-prose font-sans leading-relaxed text-balance max-lg:mx-auto max-lg:text-center hero-split:mx-0 hero-split:text-left",
    actions:
      "flex flex-wrap items-center gap-4 max-lg:justify-center hero-split:justify-start",
    link: [
      "rounded-sm pb-1 text-2xl font-medium text-headline no-underline bg-no-repeat",
      // Two layers: a short neutral-50 shine, and the teal underline under it.
      "bg-[linear-gradient(90deg,transparent,var(--color-neutral-50),transparent),linear-gradient(var(--color-headline),var(--color-headline))]",
      "bg-size-[30%_0.125em,100%_0.0625em] bg-position-[-50%_100%,0_100%]",
      "hover:bg-size-[30%_0.125em,100%_0.125em] hover:bg-position-[150%_100%,0_100%]",
      "focus-visible:bg-size-[30%_0.125em,100%_0.125em] focus-visible:bg-position-[150%_100%,0_100%]",
      "transition-[background-position,background-size] duration-700 ease-out motion-reduce:transition-none",
      "focus-visible:outline-2 focus-visible:outline-offset-2",
    ],
  },
});
const styles = about();

// Download CV shows once the cv link is in the profile. In development, a placeholder
// stands in until then, so it can be styled; production builds hide it.
function AboutSection({ links }: Readonly<AboutSectionProps>): JSX.Element {
  const cvHref =
    links.find((link) => link.kind === "cv")?.href ??
    (import.meta.env.DEV ? "/ruth-westnidge-cv.pdf" : undefined);

  return (
    <section aria-labelledby="about-heading">
      <h2 id="about-heading" className={styles.heading()}>
        About Me
      </h2>
      <p className={styles.body()}>
        Frontend & full stack developer from the UK, based in Spain, with
        Spanish nationality.
        <br></br>
        <br></br>
        18 months designing, architecting, and shipping products for financial
        services consultancies that solve operational bottlenecks and build
        client trust.<br></br>Building projects for 3 years.
      </p>
      <div className={styles.actions()}>
        {cvHref && (
          <SpecularLink
            href={cvHref}
            download="Ruth-Westnidge-CV.pdf"
            size="md"
            radius={1.125}
            tint="#2dd4bf"
            tintOpacity={0.04}
            textColor="#f5f5f5"
            lineColor="#2dd4bf"
            baseColor="#2dd4bf"
            intensity={1}
            idleIntensity={0.35}
            shineSize={10}
            shineFade={34}
            thickness={1.2}
            glow={1}
            followMouse
            proximity={250}
          >
            Download CV
          </SpecularLink>
        )}
        <a href="#contact" className={styles.link()}>
          Let's Talk
        </a>
      </div>
    </section>
  );
}

export default AboutSection;
