import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/index.css";
import App from "@/app.tsx";
import { projectsQuery } from "@/hooks/use-projects";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 0.1,
  tracePropagationTargets: ["localhost", import.meta.env.VITE_API_URL],
});

const queryClient = new QueryClient();

const projectsLoaded = queryClient.query(projectsQuery).catch(() => undefined);

if (window.matchMedia("(min-width: 64rem)").matches) {
  await Promise.race([
    projectsLoaded,
    new Promise((resolve) => setTimeout(resolve, 150)),
  ]);
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Missing #root element in index.html");
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
