import { Schema, model, type InferRawDocTypeFromSchema } from "mongoose";

const LINK_KINDS = [
  "linkedin",
  "github",
  "email",
  "buymeacoffee",
  "cv",
] as const;

const stackGroupSchema = new Schema(
  {
    label: { type: String, required: true, trim: true },
    items: { type: [String], default: [] },
  },
  { _id: false },
);

const linkSchema = new Schema(
  {
    kind: { type: String, required: true, enum: LINK_KINDS },
    href: {
      type: String,
      required: true,
      trim: true,
      // https, mailto, or a site path such as /cv.pdf (not protocol-relative //)
      match: [
        /^(https:\/\/|mailto:|\/(?!\/))/,
        "Link must start with https://, mailto: or /",
      ],
    },
    label: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const profileSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    stack: { type: [stackGroupSchema], default: [] },
    links: { type: [linkSchema], default: [] },
  },
  { timestamps: true },
);

// The plain shape (not a hydrated document), as seeded and as returned by .lean().
export type Profile = InferRawDocTypeFromSchema<typeof profileSchema>;

export const ProfileModel = model("Profile", profileSchema);
