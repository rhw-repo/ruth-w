import type { JSX } from "react";
import { cn } from "@/lib/utils";

// Temporary: the official PNG as .webp until the brand-kit SVG is converted.
// alt="" because the link around it already has the "YouTube" label.
function YouTubeIcon({
  className,
}: Readonly<{ className?: string }>): JSX.Element {
  return (
    <img
      src="/yt_icon_red_digital.webp"
      alt=""
      // The PNG has clear space built in (the logo is ~66% of its width).
      // scale-150 grows it so the logo, not the image, fills the box like the other icons.
      className={cn("object-contain scale-150", className)}
    />
  );
}

export default YouTubeIcon;
