import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import FlipCard from "@/components/flip-card";
import type { Project } from "@/types/project.ts";

type ProjectCardProps = {
  project: Project;
};

const projectCard = tv({
  slots: {
    root: "h-88",
    image: "absolute inset-0 size-full object-cover",
    placeholder: "absolute inset-0 bg-card",
    scrim:
      "absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent",
    title: "absolute inset-x-0 bottom-0 p-5 text-xl font-semibold text-white",
    back: "flex h-full flex-col gap-4 bg-card p-5 text-card-foreground",
    summary: "text-sm",
    tags: "mt-auto flex flex-wrap gap-2",
    tag: "rounded-md bg-badge px-2 py-1 text-xs text-badge-foreground",
  },
});
const styles = projectCard();

function ProjectCard({ project }: Readonly<ProjectCardProps>): JSX.Element {
  return (
    <FlipCard
      className={styles.root()}
      label={`Flip card: ${project.title}`}
      front={
        <>
          {project.image ? (
            <img
              className={styles.image()}
              src={project.image.url}
              alt={project.image.alt}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className={styles.placeholder()} />
          )}
          <div className={styles.scrim()} />
          <h3 className={styles.title()}>{project.title}</h3>
        </>
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
  );
}

export default ProjectCard;
