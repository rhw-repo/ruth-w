// Plain <a> jump links, not router links, so the browser scrolls and moves focus to the section.
export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
