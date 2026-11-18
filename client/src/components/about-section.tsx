import type { JSX } from "react";
import { tv } from "tailwind-variants/lite";
import SpecularLink from "@/components/specular-link";
import type { ProfileLink } from "@/types/profile.ts";

type AboutSectionProps = {
  links: ProfileLink[];
};

const about = tv({
  slots: {
    heading: "sr-only",
    body: "mb-6 max-w-prose font-sans leading-relaxed text-balance max-lg:mx-auto max-lg:text-center hero-split:mx-0 hero-split:text-left",
    actions:
      "flex flex-wrap items-center gap-4 max-lg:justify-center hero-split:justify-start",
    link: "rounded-sm text-2xl font-medium text-headline underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2",
  },
});
const styles = about();

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
