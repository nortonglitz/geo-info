export class NominatimError extends Error {
  public status: number
  public url: string

  constructor(message: string, status: number, url: string) {
    super(message)
    this.name = "NominatimError"
    this.status = status
    this.url = url
  }
}

export const printNominatimError = (error: unknown) => {
  if (!(error instanceof Error)) return
  if (process.env.NODE_ENV !== "development") return
  if (!(error instanceof NominatimError)) return

  console.group("NominatimError")
  console.error("Message:", error.message)
  console.error("Status:", error.status)
  console.error("URL:", error.url)
  console.error("Stack Trace:", error.stack)
  console.groupEnd()
}
