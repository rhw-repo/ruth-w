// Jump links to the home page's sections. Rendered as plain <a> elements, not router
// links, so the browser handles the scroll and moves focus to the section.
export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
