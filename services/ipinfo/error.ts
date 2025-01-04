export class IpinfoError extends Error {
  public status?: number

  constructor(message: string, status?: number) {
    super(message)
    this.name = "IpinfoError"
    this.status = status
  }
}

export const printIpinfoError = (error: unknown) => {
  if (process.env.NODE_ENV !== "development") return
  if (!(error instanceof Error)) return
  if (!(error instanceof IpinfoError)) return

  console.group("IpinfoError")
  console.error("Message:", error.message)
  console.error("Status:", error.status)
  console.error("Stack Trace:", error.stack)
  console.groupEnd()
}
