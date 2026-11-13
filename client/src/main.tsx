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
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", import.meta.env.VITE_API_URL],
});

const queryClient = new QueryClient();

// The projects request starts with the HTML (<link rel="preload"> in index.html), so it
// has usually finished by now. Putting it in the cache before the first render means the
// project cards are in the first paint, so nothing below them shifts when they arrive.
// Wait at most 150 ms, so a slow API can't hold up the page.
// query() throws if the request fails; the error is swallowed here because ProjectList
// shows its own error state.
await Promise.race([
  queryClient.query(projectsQuery).catch(() => undefined),
  new Promise((resolve) => setTimeout(resolve, 150)),
]);

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
