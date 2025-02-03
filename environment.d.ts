declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_ENABLED: 'true' | 'false'
    AUTH_CLIENT_ID: string
    AUTH_CLIENT_SECRET: string
    AUTH_ISSUER: string
    AUTH_ENABLED: 'true' | 'false'
    AUTH_CLIENT_ID: string
    AUTH_CLIENT_SECRET: string
    AUTH_DOMAIN: string
    AUTH_ISSUER: string
    AUTH_SECRET: string
    BASE_URL: string
    ESRI_API_KEY: string
    ESRI_CLIENT_ID: string
    ESRI_CLIENT_SECRET: string
    ESRI_CLIENT_URL: string
    FEATURE_FLAGS_AUTH_KEY: string
    FEEDBACK_API_URL: string
    GOOGLE_TAG_MANAGER_ID: string
    NEXTAUTH_URL: string
    NEXT_REVALIDATE_TIME: string
    PLAYWRIGHT_AUTH_USER_USERNAME: string
    PLAYWRIGHT_AUTH_USER_PASSWORD: string
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
