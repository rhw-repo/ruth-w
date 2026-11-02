import type { JSX } from "react/jsx-runtime";
import { tv } from "tailwind-variants/lite";
import TiltedCard, { TiltedCardLayer } from "@/components/tilted-card";
import type { Project } from "@/types/project.ts";

type ProjectCardProps = {
  project: Project;
};

const projectCard = tv({
  slots: {
    placeholder: "absolute inset-0 bg-card",
    scrim:
      "absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent",
    titleLayer: "flex items-end p-5",
    title: "text-xl font-semibold text-white",
    back: "flex h-full flex-col gap-4 bg-card p-5 text-card-foreground",
    summary: "text-sm",
    tags: "mt-auto flex flex-wrap gap-2",
    tag: "rounded-md bg-badge px-2 py-1 text-xs text-badge-foreground",
  },
});
const styles = projectCard();

const CARD_HEIGHT = "22rem";

function ProjectCard({ project }: Readonly<ProjectCardProps>): JSX.Element {
  return (
    <TiltedCard
      imageSrc={project.image?.url}
      altText={project.image?.alt ?? ""}
      captionText={project.title}
      showTooltip={false}
      containerWidth="100%"
      containerHeight={CARD_HEIGHT}
      imageWidth="100%"
      imageHeight={CARD_HEIGHT}
      backContent={
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
    >
      {!project.image && <div className={styles.placeholder()} />}
      <div className={styles.scrim()} />
      <TiltedCardLayer depth={30} className={styles.titleLayer()}>
        <h3 className={styles.title()}>{project.title}</h3>
      </TiltedCardLayer>
    </TiltedCard>
  );
}

export default ProjectCard;
