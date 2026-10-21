interface ViteTypeOptions {
  // Makes import.meta.env.SOMETHING_UNDECLARED a type error
  strictImportMetaEnv: unknown
}

interface ImportMetaEnv {
  readonly VITE_API_URL: string
  readonly VITE_SENTRY_DSN: string
}
