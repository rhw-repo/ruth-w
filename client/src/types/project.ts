type ProjectImage = {
  url: string;
  alt: string;
};

export type Project = {
  _id: string;
  title: string;
  summary: string;
  tags: string[];
  repoUrl?: string;
  liveUrl?: string;
  image?: ProjectImage;
  featured: boolean;
  order: number;
  hasPage: boolean;
  slug?: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
};
