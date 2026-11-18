import type { JSX } from "react";

type IconProps = { className?: string };

function ClaudeCodeIcon({ className }: Readonly<IconProps>): JSX.Element {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="#D97757"
      className={className}
    >
      {/* Simple Icons (CC0) - https://simpleicons.org */}
      <path d="M21 10.5h3v3h-3v3h-1.5v3H18v-3h-1.5v3H15v-3H9v3H7.5v-3H6v3H4.5v-3H3v-3H0v-3h3v-6h18Zm-15 0h1.5v-3H6Zm10.5 0H18v-3h-1.5z" />
    </svg>
  );
}

export default ClaudeCodeIcon;
