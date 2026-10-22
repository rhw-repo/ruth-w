import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/types/project.ts";
import type { JSX } from "react/jsx-runtime";

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/projects`);
  if (!res.ok) {
    throw new Error(`Request failed: ${res.status}`);
  }
  return (await res.json()) as Project[];
}

function HomePage(): JSX.Element {
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });

  if (isPending) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.map((project) => (
        <li key={project._id}>
          <h2>{project.title}</h2>
          <p>{project.summary}</p>
        </li>
      ))}
    </ul>
  );
}

export default HomePage;
