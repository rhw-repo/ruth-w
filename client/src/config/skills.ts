import type { IconId } from "@/components/icons/icon-registry";

type Skill = IconId;

type SkillGroup = {
  id: string;
  label: string;
  items: Skill[];
  sectionOnly: Skill[];
};

export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["react", "typescript", "tailwind"],
    sectionOnly: ["react-router", "tanstack-query", "tanstack-table", "vitest"],
  },
  {
    id: "full-stack",
    label: "Full stack",
    items: ["node", "express", "mongodb"],
    sectionOnly: ["mongoose", "zod"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["docker", "claude-code"],
    sectionOnly: ["dev-containers", "sonarqube-ide", "lefthook", "knip"],
  },
];
