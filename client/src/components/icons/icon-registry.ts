import type { ComponentType } from "react";
import ClaudeCodeIcon from "@/components/icons/claude-code-icon";
import DockerIcon from "@/components/icons/docker-icon";
import ExpressIcon from "@/components/icons/express-icon";
import GitHubIcon from "@/components/icons/github-icon";
import JavaScriptIcon from "@/components/icons/javascript-icon";
import LinkedInIcon from "@/components/icons/linkedin-icon";
import MongoDbIcon from "@/components/icons/mongodb-icon";
import MongooseIcon from "@/components/icons/mongoose-icon";
import NodeIcon from "@/components/icons/node-icon";
import ReactIcon from "@/components/icons/react-icon";
import ReactRouterIcon from "@/components/icons/react-router-icon";
import StripeIcon from "@/components/icons/stripe-icon";
import TailwindIcon from "@/components/icons/tailwind-icon";
import TanStackIcon from "@/components/icons/tanstack-icon";
import TypeScriptIcon from "@/components/icons/typescript-icon";
import ZodIcon from "@/components/icons/zod-icon";
import {
  bcryptMark,
  createWordmark,
  expressMark,
  expressValidatorMark,
} from "@/components/icons/wordmark";

type IconEntry = {
  label: string;
  Icon: ComponentType<{ className?: string }>;
  // The logo spells out the name, so a visible label would repeat it (keep it for screen readers).
  wordmark?: true;
};

// One entry per icon. The key is the icon's fixed id, used as the React key wherever it's listed.
export const icons = {
  bcrypt: {
    label: "bcrypt",
    Icon: createWordmark("node.bcrypt.js", {
      font: "system",
      bold: true,
      mark: bcryptMark,
    }),
    wordmark: true,
  },
  "claude-code": { label: "Claude Code", Icon: ClaudeCodeIcon },
  cors: {
    label: "CORS",
    Icon: createWordmark("cors", { mark: expressMark }),
    wordmark: true,
  },
  docker: { label: "Docker", Icon: DockerIcon },
  express: { label: "Express.js", Icon: ExpressIcon },
  "express-session": {
    label: "Express-Session",
    Icon: createWordmark("express-session", { mark: expressMark }),
    wordmark: true,
  },
  "express-validator": {
    label: "Express-Validator",
    Icon: createWordmark("express-validator", {
      font: "system",
      bold: true,
      mark: expressValidatorMark,
    }),
    wordmark: true,
  },
  github: { label: "GitHub", Icon: GitHubIcon },
  helmet: {
    label: "Helmet",
    Icon: createWordmark("helmet.js"),
    wordmark: true,
  },
  javascript: { label: "JavaScript", Icon: JavaScriptIcon },
  linkedin: { label: "LinkedIn", Icon: LinkedInIcon },
  mongodb: { label: "MongoDB", Icon: MongoDbIcon },
  mongoose: { label: "Mongoose", Icon: MongooseIcon },
  node: { label: "Node.js", Icon: NodeIcon },
  react: { label: "React", Icon: ReactIcon },
  "react-router": { label: "React Router", Icon: ReactRouterIcon },
  stripe: { label: "Stripe", Icon: StripeIcon, wordmark: true },
  tailwind: { label: "Tailwind CSS", Icon: TailwindIcon },
  "tanstack-query": { label: "TanStack Query", Icon: TanStackIcon },
  "tanstack-table": { label: "TanStack Table", Icon: TanStackIcon },
  typescript: { label: "TypeScript", Icon: TypeScriptIcon },
  zod: { label: "Zod", Icon: ZodIcon },
} as const satisfies Record<string, IconEntry>;

export type IconId = keyof typeof icons;

// Finds an icon by its label, e.g. a project tag from the API ("Tailwind CSS" → "tailwind").
export const iconIdByLabel = new Map<string, IconId>(
  Object.entries(icons).map(([id, { label }]) => [label, id as IconId]),
);
