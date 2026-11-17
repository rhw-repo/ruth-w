import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { iconIdByLabel, icons } from "@/components/icons/icon-registry";
import type { Project } from "@/types/project.ts";

type ProjectCardProps = {
  project: Project;
};

// Below md, the card is stacked: image, summary (at least 4 lines from sm up), tags, title.
// The title comes first for screen readers; row-start-4 shows it last.
// From md, cards are full width: the image in a 16rem left column spanning all rows, and
// title, summary and tags stacked on the right, with the title at the top.
const projectCard = tv({
  slots: {
    card: "grid h-full grid-rows-[auto_auto_1fr_auto] bg-zinc-900 ring-zinc-50/30 sm:grid-rows-[auto_minmax(5rem,auto)_1fr_auto] md:grid-cols-[16rem_1fr] md:grid-rows-[auto_auto_1fr]",
    titleRow: "row-start-4 md:col-start-2 md:row-start-1",
    media: "px-4 md:col-start-1 md:row-span-3 md:row-start-1 md:self-start",
    summary: "md:col-start-2 md:row-start-2",
    footer: "self-start md:col-start-2 md:row-start-3",
    image: "aspect-5/6 w-full object-cover object-top",
    title:
      "text-center text-sm font-semibold tracking-wide text-headline uppercase md:text-left",
    // A wrapping row: each tag is its logo then its label, at its natural width.
    tags: "flex flex-wrap gap-x-5 gap-y-3",
    logo: "flex items-center gap-2 text-xs",
    icon: "h-6 w-auto max-w-6",
    label: "text-foreground",
    // Fallback for a tag with no logo in the icon registry.
    tag: "rounded-md border border-badge px-2 py-1 text-xs text-badge-foreground",
  },
  variants: {
    // A wordmark already shows the name, so its label is for screen readers only.
    wordmark: {
      true: { label: "sr-only", icon: "text-foreground" },
    },
  },
});
const styles = projectCard();

function ProjectCard({ project }: Readonly<ProjectCardProps>): JSX.Element {
  return (
    <Card className={styles.card()}>
      <CardContent className={styles.titleRow()}>
        <h3 className={styles.title()}>{project.title}</h3>
      </CardContent>
      <CardContent className={styles.media()}>
        {project.image && (
          <img
            className={styles.image()}
            src={project.image.url}
            alt={project.image.alt}
            loading="lazy"
            decoding="async"
          />
        )}
      </CardContent>
      <CardContent className={styles.summary()}>
        <p>{project.summary}</p>
      </CardContent>
      <CardFooter className={styles.footer()}>
        <ul className={styles.tags()}>
          {project.tags.map((tag) => {
            const id = iconIdByLabel.get(tag);
            if (!id) {
              return (
                <li key={tag} className={styles.tag()}>
                  {tag}
                </li>
              );
            }
            const entry = icons[id];
            const { Icon } = entry;
            const isWordmark = "wordmark" in entry;
            return (
              <li key={tag} className={styles.logo()}>
                <Icon className={styles.icon({ wordmark: isWordmark })} />
                <span className={styles.label({ wordmark: isWordmark })}>
                  {tag}
                </span>
              </li>
            );
          })}
        </ul>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
