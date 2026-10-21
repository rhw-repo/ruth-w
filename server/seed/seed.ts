import mongoose from "mongoose";
import { connectToDatabase } from "../db.ts";
import { ProjectModel, type Project } from "../models/Project.ts";

type ProjectSeed = Pick<Project, "title" | "summary"> &
  Partial<Omit<Project, "title" | "summary" | "createdAt" | "updatedAt">>;

const projects: ProjectSeed[] = [
  {
    title: "Gold Investing Website",
    summary:
      "React & TypeScript. Lighthouse scores up by 40+ points. Replacement for legacy WordPress website. Accessible.",
    tags: ["React", "TypeScript", "React Router"],
    repoUrl: "https://github.com/rhw-repo/update-react-ui",
    liveUrl: "https://react-typescript-ui-demo-chingu.up.railway.app/",
    featured: true,
    order: 2,
  },
  {
    title: "React ECommerce Store With Stripe Payments",
    summary: "React, TypeScript. Tailwind CSS, Node.js, Express, Mongo.",
    tags: [
      "React",
      "TypeScript",
      "React Router",
      "TanStack Query",
      "Tailwind CSS",
      "Express.js",
      "Node.js",
      "MongoDB",
      "Zod",
      "CORS",
      "Helmet",
    ],
    repoUrl: "https://github.com/rhw-repo/react-store",
    liveUrl: "https://client-production-1a36.up.railway.app/store",
    featured: true,
    order: 1,
  },
];

// Matches on title, so running the script again updates the project instead of duplicating it.
async function upsertProject(data: ProjectSeed): Promise<void> {
  const existing = await ProjectModel.findOne({ title: data.title });
  if (existing) {
    existing.set(data);
    await existing.save();
    console.log(`Updated: ${data.title}`);
  } else {
    await ProjectModel.create(data);
    console.log(`Created: ${data.title}`);
  }
}

async function seedProjects(): Promise<void> {
  await Promise.all(projects.map(upsertProject));
}

try {
  await connectToDatabase();
  await seedProjects();
} finally {
  await mongoose.disconnect();
}
