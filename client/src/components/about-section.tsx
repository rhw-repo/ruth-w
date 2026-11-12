import type { JSX } from "react";
import { tv } from "tailwind-variants/lite";

const about = tv({
  slots: {
    heading: "mb-4 mt-4 font-heading text-3xl text-headline",
    body: "mb-6 max-w-prose font-sans leading-relaxed",
    link: "rounded-sm font-medium text-headline underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2",
  },
});
const styles = about();

function AboutSection(): JSX.Element {
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
      <a href="#contact" className={styles.link()}>
        Let's Talk
      </a>
    </section>
  );
}

export default AboutSection;
