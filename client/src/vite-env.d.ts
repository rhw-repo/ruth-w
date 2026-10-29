/* eslint-disable @typescript-eslint/consistent-type-definitions -- interfaces are required here to merge with Vite's types */

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_SENTRY_DSN: string;
}
