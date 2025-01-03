"use server"
import { insertQueryParamsOnURL } from "@/libs/strings"

type TimeZoneDBData = {
  status: string
  message: string
  countryCode: string
  countryName: string
  regionName: string
  cityName: string
  zoneName: string
  abbreviation: string
  gmtOffset: number
  dst: string
  zoneStart: number
  zoneEnd: number
  nextAbbreviation: string
  timestamp: number
  formatted: string
}

export async function fetchLocalTimeByCoordinates({ lat, lon }: { lat: number; lon: number }) {
  if (!lat || !lon) {
    throw new Error("Latitude and Longitude are required.")
  }

  try {
    const url = insertQueryParamsOnURL(`${process.env.TIMEZONEDB_API_BASE_URL}/get-time-zone`, {
      key: process.env.TIMEZONEDB_API_KEY,
      format: "json",
      by: "position",
      lat,
      lng: lon
    })

    const res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Error fetching time data: ${res.statusText}`)
    }

    const { formatted, zoneName } = (await res.json()) as TimeZoneDBData

    return {
      date: formatted,
      zoneName
    }
  } catch (error) {
    console.error("Error fetching time:", error)
    throw error
  }
}
