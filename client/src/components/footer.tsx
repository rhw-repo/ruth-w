import type { JSX } from "react";
import { Link, useLocation } from "react-router";
import { tv } from "tailwind-variants/lite";
import ExternalLink from "@/components/external-link.tsx";
import { navItems } from "@/config/nav-items.ts";
import { socialLinks } from "@/config/social-links.ts";

const EMAIL = "ruthuptoeleventech@gmail.com";

// Read once when the module loads, so rendering stays pure
const YEAR = new Date().getFullYear();

const homeItem = { label: "Home", to: "/" };

const footer = tv({
  slots: {
    root: "mt-16 border-t border-border bg-nav text-nav-foreground",
    inner: "mx-auto max-w-5xl px-4",
    columns: "grid gap-12 pt-8 md:grid-cols-[1fr_1.5fr] md:pt-20",
    heading: "mb-4 text-xs tracking-widest text-headline uppercase",
    navList: "grid gap-3 pl-2 md:pl-0",
    navLink: "flex items-center gap-3 font-heading",
    dash: "w-4 border-t border-muted-foreground",
    contactList: "divide-y divide-border border-b border-border",
    contactLink: "flex items-center gap-4 px-2 py-4",
    contactName: "flex-1 font-heading text-3xl",
    iconCircle:
      "inline-flex size-10 items-center justify-center rounded-full border border-border",
    icon: "size-4",
    bottom:
      "flex flex-col items-center gap-4 py-8 text-center text-sm text-muted-foreground md:flex-row md:justify-between",
    link: "rounded-md transition-colors hover:text-headline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
  },
});

const styles = footer();

function Footer(): JSX.Element {
  const { pathname } = useLocation();
  // No Home link when already on the home page
  const footerNavItems = pathname === "/" ? navItems : [homeItem, ...navItems];

  return (
    <footer className={styles.root()}>
      <div className={styles.inner()}>
        <div className={styles.columns()}>
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
            <h2 className={styles.heading()}>Contact &amp; Social</h2>
            <ul className={styles.contactList()}>
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className={styles.link({ class: styles.contactLink() })}
                >
                  <span className={styles.contactName()}>Email</span>
                  <span aria-hidden="true" className={styles.iconCircle()}>
                    <svg
                      viewBox="0 0 24 24"
                      className={styles.icon()}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>
                </a>
              </li>
              {socialLinks.map(({ label, href, Icon }) => (
                <li key={href}>
                  <ExternalLink
                    href={href}
                    className={styles.link({ class: styles.contactLink() })}
                  >
                    <span className={styles.contactName()}>{label}</span>
                    <span aria-hidden="true" className={styles.iconCircle()}>
                      <Icon className={styles.icon()} />
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
