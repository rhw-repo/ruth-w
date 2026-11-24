import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import ExternalLink from "@/components/external-link";
import { iconIdByLabel, icons } from "@/components/icons/icon-registry";
import type { Project } from "@/types/project.ts";

type ProjectCardProps = {
  project: Project;
};

// The title is first in the DOM for screen readers; row-start-4 shows it last below md.
const projectCard = tv({
  slots: {
    card: "grid h-full grid-rows-[auto_auto_1fr_auto] bg-zinc-900 ring-zinc-50/30 sm:grid-rows-[auto_minmax(5rem,auto)_1fr_auto] md:grid-cols-[16rem_1fr] md:grid-rows-[auto_auto_1fr]",
    titleRow: "row-start-4 md:col-start-2 md:row-start-1",
    media: "px-4 md:col-start-1 md:row-span-3 md:row-start-1 md:self-start",
    summary: "md:col-start-2 md:row-start-2",
    footer:
      "flex-col items-start gap-4 self-start md:col-start-2 md:row-start-3",
    image: "aspect-5/6 w-full object-cover object-top",
    title:
      "text-center text-sm font-semibold tracking-wide text-headline uppercase md:text-left",
    tags: "flex flex-wrap gap-x-5 gap-y-3",
    logo: "flex items-center gap-2 text-xs",
    icon: "h-6 w-auto max-w-6",
    label: "text-foreground",
    tag: "rounded-md border border-badge px-2 py-1 text-xs text-badge-foreground",
    links: "flex flex-wrap gap-x-6 gap-y-2",
    link: "rounded-sm text-sm font-medium text-headline underline underline-offset-4 hover:decoration-2 focus-visible:outline-2 focus-visible:outline-offset-2",
  },
  variants: {
    wordmark: {
      true: { label: "sr-only", icon: "text-foreground" },
    },
  },
});
const styles = projectCard();

function ProjectCard({ project }: Readonly<ProjectCardProps>): JSX.Element {
  const hasLinks = Boolean(project.liveUrl) || Boolean(project.repoUrl);

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
        {hasLinks && (
          <div className={styles.links()}>
            {project.liveUrl && (
              <ExternalLink href={project.liveUrl} className={styles.link()}>
                Visit demo<span className="sr-only">: {project.title}</span>
              </ExternalLink>
            )}
            {project.repoUrl && (
              <ExternalLink href={project.repoUrl} className={styles.link()}>
                Code<span className="sr-only">: {project.title}</span>
              </ExternalLink>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

export default ProjectCard;
