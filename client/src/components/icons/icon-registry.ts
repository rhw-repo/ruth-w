import type { ComponentType } from "react";
import ClaudeCodeIcon from "@/components/icons/claude-code-icon";
import DockerIcon from "@/components/icons/docker-icon";
import ExpressIcon from "@/components/icons/express-icon";
import GitHubIcon from "@/components/icons/github-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import MongoDbIcon from "@/components/icons/mongodb-icon";
import NodeIcon from "@/components/icons/node-icon";
import ReactIcon from "@/components/icons/react-icon";
import TypeScriptIcon from "@/components/icons/typescript-icon";

type IconEntry = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
};

// One entry per icon. The key is the icon's fixed id, used as the React key wherever it's listed.
export const icons = {
  "claude-code": { label: "Claude Code", Icon: ClaudeCodeIcon },
  docker: { label: "Docker", Icon: DockerIcon },
  express: { label: "Express.js", Icon: ExpressIcon },
  github: { label: "GitHub", Icon: GitHubIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  mongodb: { label: "MongoDB", Icon: MongoDbIcon },
  node: { label: "Node.js", Icon: NodeIcon },
  react: { label: "React", Icon: ReactIcon },
  typescript: { label: "TypeScript", Icon: TypeScriptIcon },
} as const satisfies Record<string, IconEntry>;

export type IconId = keyof typeof icons;
