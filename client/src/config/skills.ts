import type { IconId } from "@/components/icons/icon-registry";

type SkillGroup = {
  id: string;
  label: string;
  items: IconId[];
};

// Shared by the Skills section and the desktop navbar. The ids are fixed, for React keys;
// each item is an id from the icon registry, which supplies its label and logo.
export const skillGroups: SkillGroup[] = [
  { id: "frontend", label: "Frontend", items: ["react", "typescript"] },
  {
    id: "full-stack",
    label: "Full stack",
    items: ["node", "express", "mongodb"],
  },
  { id: "tools", label: "Tools", items: ["claude-code", "docker"] },
];
