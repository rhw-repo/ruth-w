import type { JSX } from "react";
import { tv, type VariantProps } from "tailwind-variants/lite";
import ExternalLink from "@/components/external-link.tsx";
import { icons, type IconId } from "@/components/icons/icon-registry";
import { useProfile } from "@/hooks/use-profile";

// Padding is 25% of the icon size, for the logos' clear space
const socialLinksStyles = tv({
  slots: {
    list: "flex items-center gap-2",
    link: "inline-flex rounded-md p-[calc(var(--icon-size)*0.25)] transition-colors hover:text-headline focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none",
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

function SocialLinks({
  size,
}: Readonly<SocialLinksProps>): JSX.Element | null {
  const styles = socialLinksStyles({ size });
  const { data: profile } = useProfile();

  // Profile links whose kind has a logo in the registry (github, linkedin), in the profile's order
  const links = (profile?.links ?? []).flatMap((link) =>
    link.kind in icons
      ? [{ ...link, Icon: icons[link.kind as IconId].Icon }]
      : [],
  );

  if (links.length === 0) return null;

  return (
    <ul className={styles.list()}>
      {links.map(({ label, href, Icon }) => (
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
