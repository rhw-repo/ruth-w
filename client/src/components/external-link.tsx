import type { AnchorHTMLAttributes, JSX } from "react";
import { tv } from "tailwind-variants/lite";

type ExternalLinkProps = Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "rel" | "target"
> & {
  href: string;
};

const externalLink = tv({
  slots: {
    newTabNotice: "sr-only",
  },
});

const styles = externalLink();

// noreferrer also implies noopener, so the new tab can't reach window.opener
function ExternalLink({
  children,
  ...props
}: Readonly<ExternalLinkProps>): JSX.Element {
  return (
    <a {...props} target="_blank" rel="noreferrer">
      {children}
      <span className={styles.newTabNotice()}> (opens in a new tab)</span>
    </a>
  );
}

export default ExternalLink;
