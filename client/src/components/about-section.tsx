import type { JSX } from "react";
import { tv } from "tailwind-variants/lite";
import SpecularLink from "@/components/specular-link";
import type { ProfileLink } from "@/types/profile.ts";

type AboutSectionProps = {
  links: ProfileLink[];
};

const about = tv({
  slots: {
    heading: "mb-4 mt-4 font-heading text-3xl text-headline",
    body: "mb-6 max-w-prose font-sans leading-relaxed",
    actions: "flex flex-wrap items-center gap-4",
    link: "rounded-sm text-2xl font-medium text-headline underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2",
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
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur.
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
