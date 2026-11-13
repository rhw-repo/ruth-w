import type { IconId } from "@/components/icons/icon-registry";

// A skill is an icon-registry id; the registry supplies its label and logo.
type Skill = IconId;

type SkillGroup = {
  id: string;
  label: string;
  // Main stack: the Skills section, the navbar row and the row under the Lanyard.
  items: Skill[];
  // Secondary row: the Skills section only.
  libraries: Skill[];
};

// Shared by the Skills section and SkillIconRow (navbar and under the Lanyard).
// The group ids are fixed, for React keys.
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["react", "typescript", "tailwind"],
    libraries: ["react-router", "tanstack-query", "tanstack-table"],
  },
  {
    id: "full-stack",
    label: "Full stack",
    items: ["node", "express", "mongodb"],
    libraries: ["mongoose", "zod"],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["claude-code", "docker"],
    libraries: [],
  },
];
