import type { IconId } from "@/components/icons/icon-registry";

// A skill is an icon-registry id; the registry supplies its label and logo.
type Skill = IconId;

type SkillGroup = {
  id: string;
  label: string;
  // Main stack: the Skills section, the navbar row and the row under the Lanyard.
  items: Skill[];
  // Shown only in the Skills section, after items.
  sectionOnly: Skill[];
};

// Shared by the Skills section and SkillIconRow (navbar and under the Lanyard).
// The group ids are fixed, for React keys.
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
