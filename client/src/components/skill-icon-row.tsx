import type { JSX } from "react";
import { tv } from "tailwind-variants/lite";
import { icons } from "@/components/icons/icon-registry";
import { skillGroups } from "@/config/skills";
import { cn } from "@/lib/utils";

const skillIconRow = tv({
  slots: {
    root: "flex items-center gap-4",
    icon: "size-5",
  },
});
const styles = skillIconRow();

type SkillIconRowProps = {
  className?: string;
};

// A row of small skill logos, used as decoration in the desktop navbar and under the
// Lanyard on mobile. Hidden from screen readers: it repeats the Skills section.
// Each logo has a title, so hovering shows its name.
function SkillIconRow({ className }: Readonly<SkillIconRowProps>): JSX.Element {
  return (
    <ul aria-hidden="true" className={cn(styles.root(), className)}>
      {skillGroups
        .flatMap((group) => group.items)
        .map((id) => {
          const { label, Icon } = icons[id];
          return (
            <li key={id} title={label}>
              <Icon className={styles.icon()} />
            </li>
          );
        })}
    </ul>
  );
}

export default SkillIconRow;
