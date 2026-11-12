import type { JSX } from "react";
import { tv } from "tailwind-variants/lite";
import { buttonVariants } from "@/components/ui/button-variants";
import ExternalLink from "@/components/external-link";
import type { ProfileLink } from "@/types/profile.ts";

type AboutSectionProps = {
  links: ProfileLink[];
};

const about = tv({
  slots: {
    heading: "mb-4 mt-4 font-heading text-3xl text-headline",
    body: "mb-6 max-w-prose font-sans leading-relaxed",
    actions: "flex flex-wrap items-center gap-4",
    link: "rounded-sm font-medium text-headline underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2",
  },
});
const styles = about();

// Each button shows once its link is in the profile. In development, placeholders
// stand in until then, so the buttons can be styled; production builds hide them.
function AboutSection({ links }: Readonly<AboutSectionProps>): JSX.Element {
  const cvHref =
    links.find((link) => link.kind === "cv")?.href ??
    (import.meta.env.DEV ? "/ruth-westnidge-cv.pdf" : undefined);
  const coffeeHref =
    links.find((link) => link.kind === "buymeacoffee")?.href ??
    (import.meta.env.DEV ? "https://buymeacoffee.com" : undefined);

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
        <a href="#contact" className={styles.link()}>
          Let's Talk
        </a>
        {cvHref && (
          <a
            href={cvHref}
            download="Ruth-Westnidge-CV.pdf"
            className={buttonVariants()}>
            Download CV
          </a>
        )}
        {coffeeHref && (
          <ExternalLink
            href={coffeeHref}
            className={buttonVariants({ variant: "outline" })}
          >
            Buy me a coffee
          </ExternalLink>
        )}
      </div>
    </section>
  );
}

export default AboutSection;
