export type StackGroup = {
  label: string;
  items: string[];
};

type ProfileLink = {
  kind: "linkedin" | "github" | "email" | "buymeacoffee" | "cv";
  href: string;
  label: string;
};

export type Profile = {
  name: string;
  role: string;
  stack: StackGroup[];
  links: ProfileLink[];
};
