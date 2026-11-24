import type { JSX } from "react";
import { Mail } from "lucide-react";
import { tv } from "tailwind-variants/lite";

const contact = tv({
  slots: {
    root: "mx-auto max-w-5xl scroll-mt-16 px-4 py-12",
    heading: "mb-6 text-xs tracking-wide text-headline uppercase",
    email: "flex items-center gap-2 text-2xl text-secondary-foreground",
    icon: "size-4 shrink-0",
  },
});
const styles = contact();

function ContactSection(): JSX.Element {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className={styles.root()}
    >
      <h2 id="contact-heading" className={styles.heading()}>
        Contact
      </h2>
      <p className={styles.email()}>
        <Mail aria-hidden="true" className={styles.icon()} />
        ruthuptoeleventech@gmail.com
      </p>
    </section>
  );
}

export default ContactSection;
