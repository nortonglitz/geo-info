import { IpinfoError, printIpinfoError } from "./error"
import { isValidIp } from "@/validators/ip"

type UserLocation = {
  ip: string
  hostname: string
  city: string
  region: string
  country: string
  loc: string
  org: string
  postal: string
  timezone: string
}

export const getUserLocationByIp = async (ip: unknown) => {
  try {
    if (typeof ip !== "string" || !isValidIp(ip)) {
      throw new IpinfoError("Faield to fetch location details by ip due to invalid IP.")
    }

    const url = `${process.env.IPINFO_API_BASE_URL}/${ip}?token=${process.env.IPINFO_API_TOKEN}`
    const res = await fetch(url)

    if (!res.ok) {
      throw new IpinfoError("Faield to fetch location details by ip on IpInfo.", res.status)
    }

    return (await res.json()) as UserLocation
  } catch (err) {
    printIpinfoError(err)
    throw err
  }
}
