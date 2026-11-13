import {
  queryOptions,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";
import type { Project } from "@/types/project.ts";

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
  if (!res.ok) {
    throw new Error(`Request failed: ${String(res.status)}`);
  }
  return (await res.json()) as Project[];
}

// Shared by main.tsx, which prefetches before the first render, and ProjectList.
// The URL must match the <link rel="preload"> in index.html, so the browser reuses
// the response it started downloading with the HTML.
export const projectsQuery = queryOptions({
  queryKey: ["projects"],
  queryFn: fetchProjects,
});

export function useProjects(): UseQueryResult<Project[]> {
  return useQuery(projectsQuery);
}
