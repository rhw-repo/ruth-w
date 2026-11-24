import { useEffect, useRef, useState, type JSX } from "react";
import { tv } from "tailwind-variants/lite";
import SocialLinks from "@/components/social-links.tsx";
import ExternalLink from "@/components/external-link";
import SkillIconRow from "@/components/skill-icon-row";
import { navItems } from "@/config/nav-items.ts";
import { useProfile } from "@/hooks/use-profile";

const navbar = tv({
  slots: {
    header:
      "sticky top-0 z-50 border-b border-nav-edge bg-nav text-nav-foreground",
    nav: "mx-auto max-w-5xl px-4",
    bar: "flex h-16 items-center justify-between",
    skills: "max-lg:hidden",
    navRight: "ml-auto flex items-center gap-4",
    koFi: "rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 max-sm:hidden",
    koFiImage: "h-9 w-auto",
    menuButton:
      "inline-flex size-11 items-center justify-center rounded-md focus-visible:outline-2 sm:hidden",
    menuIcon: "size-6",
    menu: "sm:hidden",
    menuList: "flex flex-col gap-1 pb-4",
    link: "rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
  },
  variants: {
    placement: {
      menu: { link: "block px-2 py-3 text-base" },
    },
  },
  compoundVariants: [
    {
      placement: "menu",
      class: {
        link: "text-muted-foreground hover:text-headline",
      },
    },
  ],
});

const styles = navbar();

function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const { data: profile } = useProfile();

  const koFiHref =
    profile?.links.find((link) => link.kind === "ko-fi")?.href ??
    (import.meta.env.DEV ? "https://ko-fi.com" : undefined);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <header className={styles.header()}>
      <nav aria-label="Main" className={styles.nav()}>
        <div className={styles.bar()}>
          <SkillIconRow className={styles.skills()} />
          <div className={styles.navRight()}>
            {koFiHref && (
              <ExternalLink href={koFiHref} className={styles.koFi()}>
                <img
                  src="/support_me_on_kofi_dark.webp"
                  alt="Support me on Ko-fi"
                  className={styles.koFiImage()}
                />
              </ExternalLink>
            )}
            <SocialLinks />

            <button
              ref={menuButtonRef}
              type="button"
              aria-label="Menu"
              aria-expanded={isMenuOpen}
              aria-controls="nav-menu"
              onClick={() => {
                setIsMenuOpen((open) => !open);
              }}
              className={styles.menuButton()}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={styles.menuIcon()}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {isMenuOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div id="nav-menu" hidden={!isMenuOpen} className={styles.menu()}>
          <ul className={styles.menuList()}>
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={styles.link({ placement: "menu" })}
                >
                  {item.label}
                </a>
              </li>
            ))}
            {koFiHref && (
              <li>
                <ExternalLink
                  href={koFiHref}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={styles.link({ placement: "menu" })}
                >
                  <img
                    src="/support_me_on_kofi_dark.webp"
                    alt="Support me on Ko-fi"
                    className={styles.koFiImage()}
                  />
                </ExternalLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
