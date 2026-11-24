import type { JSX } from "react";
import { cn } from "@/lib/utils";

function YouTubeIcon({
  className,
}: Readonly<{ className?: string }>): JSX.Element {
  return (
    <img
      src="/yt_icon_red_digital.webp"
      alt=""
      className={cn("object-contain scale-150", className)}
    />
  );
}

export default YouTubeIcon;
