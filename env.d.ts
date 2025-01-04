declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_NOMINATIM_API_BASE_URL: string
    NEXT_PUBLIC_OPENMETEO_API_BASE_URL: string
    TIMEZONEDB_API_KEY: string
    TIMEZONEDB_API_BASE_URL: string
    PRISMA_DATABASE_URL: string
    PRISMA_DATABASE_PULSE_API_KEY: string
    IPINFO_API_BASE_URL: string
    IPINFO_API_TOKEN: string
  }
}
