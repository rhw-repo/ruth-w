import { Schema, model, type InferSchemaType } from "mongoose";

const imageSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      match: [/\.webp$/i, "Image must be a .webp file"],
    },
    alt: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const projectSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    summary: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    repoUrl: { type: String, trim: true },
    liveUrl: { type: String, trim: true },
    image: { type: imageSchema },
    featured: { type: Boolean, default: false },
    order: { type: Number, default: 0 },

    // Projects with their own page at /projects/:slug
    hasPage: { type: Boolean, default: false },
    slug: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      sparse: true,
      required: function (this: { hasPage: boolean }) {
        return this.hasPage;
      },
    },
    description: {
      type: String,
      trim: true,
      required: function (this: { hasPage: boolean }) {
        return this.hasPage;
      },
    },
  },
  { timestamps: true },
);

export type Project = InferSchemaType<typeof projectSchema>;

export const ProjectModel = model("Project", projectSchema);
