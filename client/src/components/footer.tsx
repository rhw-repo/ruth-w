import type { JSX } from "react";
import { Link } from "react-router";
import { tv } from "tailwind-variants/lite";
import ExternalLink from "@/components/external-link.tsx";
import { navItems } from "@/config/nav-items.ts";
import { socialLinks } from "@/config/social-links.ts";

const EMAIL = "ruthuptoeleventech@gmail.com";

// Read once when the module loads, so rendering stays pure
const YEAR = new Date().getFullYear();

// Placeholders until these pages exist
const smallLinks = [
  { label: "Placeholder 1", to: "/placeholder-1" },
  { label: "Placeholder 2", to: "/placeholder-2" },
  { label: "Placeholder 3", to: "/placeholder-3" },
];

const footerNavItems = [{ label: "Home", to: "/" }, ...navItems];

const footer = tv({
  slots: {
    root: "mt-16 border-t border-border bg-nav text-nav-foreground",
    inner: "mx-auto max-w-5xl px-4",
    columns: "grid gap-12 py-12 md:grid-cols-[1fr_auto_1.5fr]",
    heading: "mb-4 text-xs tracking-widest text-headline uppercase",
    email: "font-heading text-lg",
    smallList: "mt-8 grid gap-1 text-sm text-muted-foreground",
    navList: "grid gap-3",
    navLink: "flex items-center gap-3 font-heading",
    dash: "w-4 border-t border-muted-foreground",
    socialList: "divide-y divide-border border-b border-border",
    socialLink: "flex items-center gap-4 px-2 py-4",
    socialIndex: "text-xs text-muted-foreground tabular-nums",
    socialName: "flex-1 font-heading text-3xl",
    arrow:
      "inline-flex size-10 items-center justify-center rounded-full border border-border",
    arrowIcon: "size-4",
    bottom:
      "flex flex-wrap items-center justify-between gap-4 border-t border-border py-6 text-sm text-muted-foreground",
    link: "rounded-md transition-colors hover:text-headline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
  },
});

const styles = footer();

function Footer(): JSX.Element {
  return (
    <footer className={styles.root()}>
      <div className={styles.inner()}>
        <div className={styles.columns()}>
          <div>
            <h2 className={styles.heading()}>Contact</h2>
            <a
              href={`mailto:${EMAIL}`}
              className={styles.link({ class: styles.email() })}
            >
              {EMAIL}
            </a>
            <ul className={styles.smallList()}>
              {smallLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={styles.link()}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-labelledby="footer-nav-heading">
            <h2 id="footer-nav-heading" className={styles.heading()}>
              Navigation
            </h2>
            <ul className={styles.navList()}>
              {footerNavItems.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className={styles.link({ class: styles.navLink() })}
                  >
                    <span aria-hidden="true" className={styles.dash()} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.heading()}>Social</h2>
            <ul className={styles.socialList()}>
              {socialLinks.map(({ label, href }, index) => (
                <li key={href}>
                  <ExternalLink
                    href={href}
                    className={styles.link({ class: styles.socialLink() })}
                  >
                    <span aria-hidden="true" className={styles.socialIndex()}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={styles.socialName()}>{label}</span>
                    <span aria-hidden="true" className={styles.arrow()}>
                      <svg
                        viewBox="0 0 24 24"
                        className={styles.arrowIcon()}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      >
                        <path d="M7 17L17 7M8 7h9v9" />
                      </svg>
                    </span>
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottom()}>
          <p>© {YEAR} Ruth Westnidge</p>
          <p>Built with React &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
