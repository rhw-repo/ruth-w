import type { JSX } from "react";
import { tv, type VariantProps } from "tailwind-variants/lite";
import ExternalLink from "@/components/external-link.tsx";
import { socialLinks } from "@/config/social-links.ts";

// Padding is 25% of the icon size, for the logos' clear space
const socialLinksStyles = tv({
  slots: {
    list: "flex items-center gap-2",
    link: "inline-flex rounded-md p-[calc(var(--icon-size)*0.25)] transition-colors hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
    icon: "size-(--icon-size)",
    label: "sr-only",
  },
  variants: {
    size: {
      sm: { list: "[--icon-size:1.25rem]" },
      md: { list: "[--icon-size:1.5rem]" },
      lg: { list: "[--icon-size:2rem]" },
    },
  },
  defaultVariants: { size: "md" },
});

type SocialLinksProps = VariantProps<typeof socialLinksStyles>;

function SocialLinks({ size }: Readonly<SocialLinksProps>): JSX.Element {
  const styles = socialLinksStyles({ size });
  return (
    <ul className={styles.list()}>
      {socialLinks.map(({ label, href, Icon }) => (
        <li key={href}>
          <ExternalLink href={href} className={styles.link()}>
            <Icon className={styles.icon()} />
            <span className={styles.label()}>{label}</span>
          </ExternalLink>
        </li>
      ))}
    </ul>
  );
}

export default SocialLinks;
