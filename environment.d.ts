declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_REVALIDATE_TIME: string
    API_URL: string
    API_KEY: string
    FEEDBACK_API_URL: string
    PUBLIC_API_URL: string
    GOOGLE_TAG_MANAGER_ID: string
    UNLEASH_SERVER_API_URL: string
    UNLEASH_SERVER_API_TOKEN: string
    FEATURE_FLAGS_AUTH_KEY: string
    ESRI_CLIENT_URL: string
    ESRI_CLIENT_ID: string
    ESRI_CLIENT_SECRET: string
  }
}

declare interface Error {
  name: string
  message: string
  stack?: string
  code?: number | string
}
