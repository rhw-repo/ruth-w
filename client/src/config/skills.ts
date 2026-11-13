import type { IconId } from "@/components/icons/icon-registry";

// A library with a logo names its icon-registry id; one without names only its label.
export type Library = { icon: IconId } | { label: string };

type SkillGroup = {
  id: string;
  label: string;
  items: IconId[];
  libraries: Library[];
};

// Shared by the Skills section and the desktop navbar. The ids are fixed, for React keys;
// each item is an id from the icon registry, which supplies its label and logo.
// libraries are shown only in the Skills section; the navbar doesn't read them.
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    label: "Frontend",
    items: ["react", "typescript", "tailwind"],
    libraries: [
      { icon: "react-router" },
      { icon: "tanstack-query" },
      { icon: "tanstack-table" },
    ],
  },
  {
    id: "full-stack",
    label: "Full stack",
    items: ["node", "express", "mongodb"],
    libraries: [{ icon: "mongoose" }, { icon: "zod" }],
  },
  {
    id: "tools",
    label: "Tools",
    items: ["claude-code", "docker"],
    libraries: [],
  },
];
