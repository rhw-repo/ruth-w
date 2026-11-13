import type { JSX } from "react";
import { tv } from "tailwind-variants/lite";
import { icons } from "@/components/icons/icon-registry";
import { skillGroups } from "@/config/skills";

const skills = tv({
  slots: {
    root: "mx-auto max-w-5xl px-4 py-12",
    heading: "mb-6 text-xs tracking-wide text-headline uppercase",
    groups: "grid gap-8 sm:grid-cols-3",
    stackGroup: "grid content-start gap-4",
    groupLabel: "text-xl tracking-wide text-headline uppercase",
    tags: "flex flex-wrap gap-8",
    tag: "flex flex-col items-center gap-2 text-sm",
    label: "text-muted-foreground",
    icon: "size-8",
  },
});
const styles = skills();

function SkillsSection(): JSX.Element {
  return (
    <section aria-labelledby="skills-heading" className={styles.root()}>
      <h2 id="skills-heading" className={styles.heading()}>
        Skills
      </h2>
      <dl className={styles.groups()}>
        {skillGroups.map((group) => (
          <div key={group.id} className={styles.stackGroup()}>
            <dt className={styles.groupLabel()}>{group.label}</dt>
            <dd>
              <ul className={styles.tags()}>
                {group.items.map((id) => {
                  const { label, Icon } = icons[id];
                  return (
                    <li key={id} className={styles.tag()}>
                      <Icon className={styles.icon()} />
                      <span className={styles.label()}>{label}</span>
                    </li>
                  );
                })}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default SkillsSection;
