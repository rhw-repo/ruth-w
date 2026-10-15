import * as Sentry from "@sentry/node";
import { expressIntegration } from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [expressIntegration()],
  tracesSampleRate: 1.0,
});
