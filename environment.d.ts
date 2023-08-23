declare namespace NodeJS {
  interface ProcessEnv {
    TZ: string
    NEXT_REVALIDATE_TIME: string
    API_URL: string
    API_KEY: string
    NEXT_PUBLIC_PUBLIC_API_URL: string
    NEXT_PUBLIC_GA_MEASUREMENT_ID: string
  }
}
