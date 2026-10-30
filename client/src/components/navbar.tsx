import { useEffect, useRef, useState, type JSX } from "react";
import { Link, NavLink } from "react-router";
import { tv } from "tailwind-variants/lite";

type NavItem = { label: string; to: string };

const navItems: NavItem[] = [
  { label: "Link 1", to: "/link-1" },
  { label: "Link 2", to: "/link-2" },
  { label: "Link 3", to: "/link-3" },
];

const navbar = tv({
  slots: {
    header:
      "sticky top-0 z-50 border-b border-border bg-nav text-nav-foreground",
    nav: "mx-auto max-w-5xl px-4",
    bar: "flex h-16 items-center justify-between",
    desktopList: "hidden items-center gap-6 sm:flex",
    menuButton:
      "inline-flex size-11 items-center justify-center rounded-md focus-visible:outline-2 sm:hidden",
    menuIcon: "size-6",
    mobileMenu: "sm:hidden",
    mobileList: "flex flex-col gap-1 pb-4",
    link: "rounded-md transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
  },
  variants: {
    placement: {
      brand: { link: "font-semibold" },
      desktop: { link: "text-sm" },
      mobile: { link: "block px-2 py-3 text-base" },
    },
  },
  compoundVariants: [
    {
      placement: ["desktop", "mobile"],
      class: {
        link: "text-muted-foreground hover:text-nav-foreground aria-[current=page]:text-nav-foreground",
      },
    },
  ],
});

const styles = navbar();

function Navbar(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the mobile menu and returns focus to the button
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
          <Link to="/" className={styles.link({ placement: "brand" })}>
            Ruth W
          </Link>

          <ul className={styles.desktopList()}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={styles.link({ placement: "desktop" })}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            ref={menuButtonRef}
            type="button"
            aria-label="Menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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

        <div
          id="mobile-menu"
          hidden={!isMenuOpen}
          className={styles.mobileMenu()}
        >
          <ul className={styles.mobileList()}>
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className={styles.link({ placement: "mobile" })}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
