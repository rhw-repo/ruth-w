import mongoose from "mongoose";
import { connectToDatabase } from "../db.ts";
import { ProjectModel, type Project } from "../models/project.ts";
import { ProfileModel, type Profile } from "../models/profile.ts";

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
    image: {
      url: "/gold-investing-thumbnail.webp",
      alt: "Vorlond homepage: the heading Growth Investing over a lake with forested islands and mountains",
    },
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
    image: {
      url: "/react-store-stripe.webp",
      alt: "Store checkout: Stripe payment form with card details and a Pay button",
    },
    featured: true,
    order: 1,
  },
];

type ProfileSeed = Omit<Profile, "_id" | "createdAt" | "updatedAt">;

// Add buymeacoffee and cv links here once they exist.
const profile: ProfileSeed = {
  name: "Ruth Westnidge",
  role: "Software Developer",
  stack: [
    { label: "Frontend", items: ["React", "TypeScript"] },
    { label: "Full stack", items: ["Node.js", "Express.js", "MongoDB"] },
    { label: "Tools", items: ["Claude Code", "Docker"] },
  ],
  links: [
    { kind: "github", href: "https://github.com/rhw-repo", label: "GitHub" },
    {
      kind: "linkedin",
      href: "https://www.linkedin.com/in/ruth-westnidge/",
      label: "LinkedIn",
    },
    {
      kind: "email",
      href: "mailto:ruthuptoeleventech@gmail.com",
      label: "Email",
    },
  ],
};

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

// There's only one profile, so this updates it if it exists.
async function upsertProfile(): Promise<void> {
  const existing = await ProfileModel.findOne();
  if (existing) {
    existing.set(profile);
    await existing.save();
    console.log("Updated: profile");
  } else {
    await ProfileModel.create(profile);
    console.log("Created: profile");
  }
}

try {
  await connectToDatabase();
  await seedProjects();
  await upsertProfile();
} finally {
  await mongoose.disconnect();
}
