declare namespace NodeJS {
  interface ProcessEnv {
    TZ: string
    NEXT_REVALIDATE_TIME: string
    API_URL: string
    API_KEY: string
    FEEDBACK_API_URL: string
    PUBLIC_API_URL: string
    NEXT_PUBLIC_GA_MEASUREMENT_ID: string
  }
}

declare interface Error {
  name: string
  message: string
  stack?: string
  code?: number | string
}
