import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import type { Profile } from "@/types/profile.ts";

async function fetchProfile(): Promise<Profile> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`);
  if (!res.ok) {
    throw new Error(`Request failed: ${String(res.status)}`);
  }
  return (await res.json()) as Profile;
}

export function useProfile(): UseQueryResult<Profile> {
  return useQuery({ queryKey: ["profile"], queryFn: fetchProfile });
}
