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
    // Both lists share one column template, so their logos line up across the two rows.
    tags: "grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] gap-x-4 gap-y-6",
    // Every item gets the same box: min-h (not h) so enlarged text grows it instead of overflowing.
    tag: "flex min-h-20 flex-col items-start gap-2 text-sm",
    label: "text-muted-foreground",
    // 2rem tall, as wide as the logo (capped at 2rem), so every logo starts at the same left edge.
    icon: "h-8 w-auto max-w-8",
    libraries:
      "grid grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] items-end gap-x-4 gap-y-6",
    library:
      "justify-self-start rounded-md border border-badge px-2 py-1 text-xs text-badge-foreground",
  },
});
const styles = skills();

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
            {group.libraries.length > 0 && (
              <ul aria-label="Libraries" className={styles.libraries()}>
                {group.libraries.map((library) => {
                  // A library with a logo shows like the main skills; one without is a text tag.
                  if ("icon" in library) {
                    const { label, Icon } = icons[library.icon];
                    return (
                      <li key={library.icon} className={styles.tag()}>
                        <Icon className={styles.icon()} />
                        <span className={styles.label()}>{label}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={library.label} className={styles.library()}>
                      {library.label}
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

export default SkillsSection;
