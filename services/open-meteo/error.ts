export class OpenMeteoError extends Error {
  public status: number
  public url: string

  constructor(message: string, status: number, url: string) {
    super(message)
    this.name = "OpenMeteoError"
    this.status = status
    this.url = url
  }
}

export const printOpenMeteoError = (error: unknown) => {
  if (!(error instanceof Error)) return
  if (process.env.NODE_ENV !== "development") return
  if (!(error instanceof OpenMeteoError)) return

  console.group("OpenMeteoError")
  console.error("Message:", error.message)
  console.error("Status:", error.status)
  console.error("URL:", error.url)
  console.error("Stack Trace:", error.stack)
  console.groupEnd()
}
