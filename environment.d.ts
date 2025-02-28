declare namespace NodeJS {
  interface ProcessEnv {
    API_KEY: string
    API_URL: string
    AUTH_ENABLED: 'true' | 'false'
    BASE_URL: string
    ESRI_API_KEY: string
    ESRI_CLIENT_ID: string
    ESRI_CLIENT_SECRET: string
    ESRI_CLIENT_URL: string
    FEATURE_FLAGS_AUTH_KEY: string
    FEEDBACK_API_URL: string
    GOOGLE_TAG_MANAGER_ID: string
    PUBLIC_API_URL: string
    REDIS_HOST: string
    REVALIDATE_SECRET: string
    RUM_APPLICATION_ID: string
    RUM_IDENTITY_POOL_ID: string
    UNLEASH_SERVER_API_URL: string
    UNLEASH_SERVER_API_TOKEN: string
  }
}

declare interface Error {
  name: string
  message: string
  stack?: string
  code?: number | string
}
