export type StackGroup = {
  label: string;
  items: string[];
};

export type ProfileLink = {
  kind: "linkedin" | "github" | "email" | "ko-fi" | "cv" | "youtube";
  href: string;
  label: string;
};

export type Profile = {
  name: string;
  role: string;
  stack: StackGroup[];
  links: ProfileLink[];
};
