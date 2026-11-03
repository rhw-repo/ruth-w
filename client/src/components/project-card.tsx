import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Project } from "@/types/project.ts";

type ProjectCardProps = {
  project: Project;
};

// The card's rows are image, summary (at least 4 lines from sm up), tags, title, so tags line up across a row.
// The title comes first for screen readers; row-start-4 shows it last.
const projectCard = tv({
  slots: {
    card: "grid h-full grid-rows-[auto_auto_1fr_auto] bg-zinc-900 ring-zinc-50/30 sm:grid-rows-[auto_minmax(5rem,auto)_1fr_auto]",
    titleRow: "row-start-4",
    media: "px-4",
    footer: "self-start",
    image: "aspect-5/6 w-full object-cover object-top",
    title:
      "text-center text-sm font-semibold tracking-wide text-headline uppercase",
    tags: "flex flex-wrap gap-2",
    tag: "rounded-md bg-badge px-2 py-1 text-xs text-badge-foreground",
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
      <CardContent>
        <p>{project.summary}</p>
      </CardContent>
      <CardFooter className={styles.footer()}>
        <ul className={styles.tags()}>
          {project.tags.map((tag) => (
            <li key={tag} className={styles.tag()}>
              {tag}
            </li>
          ))}
        </ul>
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
