import { useEffect, useRef, type JSX } from "react";
import { Link, useLocation } from "react-router";
import { tv } from "tailwind-variants/lite";
import ExternalLink from "@/components/external-link.tsx";
import GlassSurface from "@/components/glass-surface";
import { icons, type IconId } from "@/components/icons/icon-registry";
import { navItems } from "@/config/nav-items.ts";
import { useProfile } from "@/hooks/use-profile";

// Read once when the module loads, so rendering stays pure
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
    nameArea: "relative @container pb-12",
    name: "py-4 text-center font-heading text-[10cqi] leading-none font-semibold tracking-tight whitespace-nowrap text-headline md:text-[8cqi]",
    pill: "group pointer-events-none absolute top-0 left-0 hidden lg:pointer-fine:motion-safe:block",
    // Fade the glass itself, not the pill wrapper: opacity below 1 on an ancestor
    // stops backdrop-filter from seeing the name behind it.
    glass:
      "invisible size-24 opacity-0 transition-[opacity,visibility] duration-300 group-data-[active=true]:visible group-data-[active=true]:opacity-100 motion-reduce:transition-none forced-colors:hidden [@media(prefers-reduced-transparency:reduce)]:hidden",
  },
});

const styles = footer();

// Same conditions as the pill's lg:pointer-fine:motion-safe:block class.
const FOLLOW_QUERY =
  "(min-width: 64rem) and (pointer: fine) and (prefers-reduced-motion: no-preference)";

const clamp = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), Math.max(min, max));

function FooterName(): JSX.Element {
  const areaRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const area = areaRef.current;
    const pill = pillRef.current;
    if (!area || !pill) return;
    const follow = window.matchMedia(FOLLOW_QUERY);
    const target = { x: 0, y: 0 };
    const position = { x: 0, y: 0 };
    let raf = 0;
    let last = 0;

    // Pointer positions are CSS pixels, so the transform is in px.
    const place = (): void => {
      const x = position.x - pill.offsetWidth / 2;
      const y = position.y - pill.offsetHeight / 2;
      pill.style.transform = `translate3d(${String(x)}px, ${String(y)}px, 0)`;
    };

    const frame = (now: number): void => {
      const dt = last ? Math.min(0.05, (now - last) / 1000) : 1 / 60;
      last = now;
      const ease = 1 - Math.exp(-dt * 10);
      position.x += (target.x - position.x) * ease;
      position.y += (target.y - position.y) * ease;
      place();
      const gap =
        Math.abs(target.x - position.x) + Math.abs(target.y - position.y);
      if (gap > 0.1) {
        raf = requestAnimationFrame(frame);
      } else {
        raf = 0;
        last = 0;
      }
    };

    const aim = (event: PointerEvent): void => {
      const rect = area.getBoundingClientRect();
      const halfWidth = pill.offsetWidth / 2;
      const halfHeight = pill.offsetHeight / 2;
      target.x = clamp(
        event.clientX - rect.left,
        halfWidth,
        rect.width - halfWidth,
      );
      target.y = clamp(
        event.clientY - rect.top,
        halfHeight,
        rect.height - halfHeight,
      );
    };

    const onEnter = (event: PointerEvent): void => {
      if (!follow.matches) return;
      aim(event);
      position.x = target.x;
      position.y = target.y;
      place();
      pill.dataset.active = "true";
    };

    const onMove = (event: PointerEvent): void => {
      if (!follow.matches) return;
      aim(event);
      raf ||= requestAnimationFrame(frame);
    };

    const onLeave = (): void => {
      delete pill.dataset.active;
    };

    area.addEventListener("pointerenter", onEnter);
    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      area.removeEventListener("pointerenter", onEnter);
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // The © line already gives the name as text, so this repeat is hidden from screen readers.
  return (
    <div ref={areaRef} aria-hidden="true" className={styles.nameArea()}>
      <p className={styles.name()}>Ruth Westnidge</p>
      <div ref={pillRef} className={styles.pill()}>
        <GlassSurface className={styles.glass()} />
      </div>
    </div>
  );
}

function Footer(): JSX.Element {
  const { pathname } = useLocation();
  const { data: profile } = useProfile();
  const links = profile?.links ?? [];
  const email = links.find((link) => link.kind === "email");
  // Same rule as SocialLinks: profile links with a logo in the registry
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
              {/* No Home link when already on the home page */}
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

        <FooterName />
      </div>
    </footer>
  );
}

export default Footer;
