import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import FlipCard from "@/components/flip-card";
import type { Project } from "@/types/project.ts";

type ProjectCardProps = {
  project: Project;
};

const projectCard = tv({
  slots: {
    root: "flex flex-col gap-3",
    card: "h-88",
    image: "absolute inset-0 size-full object-cover object-top",
    placeholder: "absolute inset-0 bg-card",
    title:
      "text-center text-sm font-semibold tracking-wide text-headline uppercase",
    back: "flex h-full flex-col gap-4 bg-card p-5 text-card-foreground",
    summary: "text-sm",
    tags: "mt-auto flex flex-wrap gap-2",
    tag: "rounded-md bg-badge px-2 py-1 text-xs text-badge-foreground",
  },
});
const styles = projectCard();

function ProjectCard({ project }: Readonly<ProjectCardProps>): JSX.Element {
  return (
    <div className={styles.root()}>
      <FlipCard
        className={styles.card()}
        label={`Flip card: ${project.title}`}
        front={
          project.image ? (
            <img
              className={styles.image()}
              src={project.image.url}
              alt={project.image.alt}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={styles.placeholder()} />
          )
        }
        back={
          <div className={styles.back()}>
            <p className={styles.summary()}>{project.summary}</p>
            <ul className={styles.tags()}>
              {project.tags.map((tag) => (
                <li key={tag} className={styles.tag()}>
                  {tag}
                </li>
              ))}
            </ul>
          </div>
        }
      />
      <h3 className={styles.title()}>{project.title}</h3>
    </div>
  );
}

export default ProjectCard;
