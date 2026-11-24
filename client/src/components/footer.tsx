import type { JSX } from "react";
import { Link, useLocation } from "react-router";
import { tv } from "tailwind-variants/lite";
import ExternalLink from "@/components/external-link.tsx";
import { icons, type IconId } from "@/components/icons/icon-registry";
import { navItems } from "@/config/nav-items.ts";
import { useProfile } from "@/hooks/use-profile";

const YEAR = new Date().getFullYear();

const footer = tv({
  slots: {
    root: "mt-16 border-t border-nav-edge bg-nav text-nav-foreground",
    inner: "mx-auto max-w-5xl px-4",
    columns: "grid gap-12 pt-8 md:grid-cols-[1fr_1.05fr] md:pt-20",
    heading: "mb-4 text-xs tracking-widest text-headline uppercase",
    navList: "grid gap-3 pl-2 md:pl-0",
    navLink: "flex items-center gap-3 font-heading",
    dash: "w-4 border-t border-muted-foreground",
    contactList: "divide-y divide-nav-edge border-b border-nav-edge",
    contactLink: "flex items-center gap-4 px-2 py-4",
    contactName: "flex-1 font-heading text-3xl",
    iconCircle:
      "inline-flex size-10 items-center justify-center rounded-full border border-border",
    icon: "size-10",
    bottom:
      "flex flex-col items-center gap-4 py-8 text-center text-sm text-muted-foreground md:flex-row md:justify-between",
    link: "rounded-md transition-colors hover:text-headline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
  },
});

const styles = footer();

function Footer(): JSX.Element {
  const { pathname } = useLocation();
  const { data: profile } = useProfile();
  const links = profile?.links ?? [];
  const email = links.find((link) => link.kind === "email");
  const socials = links.flatMap((link) =>
    link.kind in icons
      ? [{ ...link, Icon: icons[link.kind as IconId].Icon }]
      : [],
  );

  return (
    <footer className={styles.root()}>
      <div className={styles.inner()}>
        <div className={styles.columns()}>
          <nav aria-labelledby="footer-nav-heading">
            <h2 id="footer-nav-heading" className={styles.heading()}>
              Navigation
            </h2>
            <ul className={styles.navList()}>
              {pathname !== "/" && (
                <li>
                  <Link
                    to="/"
                    className={styles.link({ class: styles.navLink() })}
                  >
                    <span aria-hidden="true" className={styles.dash()} /> Home
                  </Link>
                </li>
              )}
              {navItems
                .filter((item) => item.href !== "/#contact")
                .map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className={styles.link({ class: styles.navLink() })}
                    >
                      <span aria-hidden="true" className={styles.dash()} />{" "}
                      {item.label}
                    </a>
                  </li>
                ))}
            </ul>
          </nav>

          <div>
            <h2 className={styles.heading()}>Contact &amp; Social</h2>
            <ul className={styles.contactList()}>
              {email && (
                <li>
                  <a
                    href={email.href}
                    className={styles.link({ class: styles.contactLink() })}
                  >
                    <span className={styles.contactName()}>Email</span>
                    <span aria-hidden="true" className={styles.iconCircle()}>
                      <svg
                        viewBox="2 4 20 16"
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
              )}
              {socials.map(({ label, href, Icon }) => (
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
