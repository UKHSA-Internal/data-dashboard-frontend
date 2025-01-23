declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_ENABLED: 'true' | 'false'
    REDIS_HOST: string
    NEXT_REVALIDATE_TIME: string
    BASE_URL: string
    API_URL: string
    API_KEY: string
    FEEDBACK_API_URL: string
    PUBLIC_API_URL: string
    GOOGLE_TAG_MANAGER_ID: string
    UNLEASH_SERVER_API_URL: string
    UNLEASH_SERVER_API_TOKEN: string
    FEATURE_FLAGS_AUTH_KEY: string
    RUM_APPLICATION_ID: string
    RUM_IDENTITY_POOL_ID: string
  }
}

declare interface Error {
  name: string
  message: string
  stack?: string
  code?: number | string
}
