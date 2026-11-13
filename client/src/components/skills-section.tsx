import type { JSX } from "react";
import { tv } from "tailwind-variants/lite";
import { icons, type IconId } from "@/components/icons/icon-registry";
import { skillGroups } from "@/config/skills";

const skills = tv({
  slots: {
    root: "mx-auto max-w-5xl px-4 py-12",
    heading: "mb-6 text-xs tracking-wide text-headline uppercase",
    groups: "grid gap-8 sm:grid-cols-3",
    stackGroup:
      "grid content-start gap-4 bg-zinc-900 ring-1 ring-zinc-50/30 p-4 rounded-sm",
    groupLabel: "text-xl tracking-wide text-headline uppercase",
    // Both lists share one column template, so their logos line up across the two rows.
    tags: "grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-x-4 gap-y-6",
    // Every item gets the same box: min-h (not h) so enlarged text grows it instead of overflowing.
    tag: "flex min-h-20 flex-col items-start gap-2 text-sm",
    label: "text-muted-foreground",
    // 2rem tall, as wide as the logo (capped at 2rem), so every logo starts at the same left edge.
    icon: "h-8 w-auto max-w-8",
  },
});
const styles = skills();

function SkillItem({ id }: Readonly<{ id: IconId }>): JSX.Element {
  const { label, Icon } = icons[id];
  return (
    <li className={styles.tag()}>
      <Icon className={styles.icon()} />
      <span className={styles.label()}>{label}</span>
    </li>
  );
}

function SkillsSection(): JSX.Element {
  return (
    <section aria-labelledby="skills-heading" className={styles.root()}>
      <h2 id="skills-heading" className={styles.heading()}>
        Skills
      </h2>
      <div className={styles.groups()}>
        {skillGroups.map((group) => (
          <div key={group.id} className={styles.stackGroup()}>
            <h3 className={styles.groupLabel()}>{group.label}</h3>
            <ul className={styles.tags()}>
              {group.items.map((id) => (
                <SkillItem key={id} id={id} />
              ))}
            </ul>
            {group.libraries.length > 0 && (
              <ul aria-label="Libraries" className={styles.tags()}>
                {group.libraries.map((id) => (
                  <SkillItem key={id} id={id} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
