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
