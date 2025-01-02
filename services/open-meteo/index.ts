import { insertQueryParamsOnURL } from "@/libs/strings"
import { OpenMeteoError, printOpenMeteoError } from "./error"

const BASE_URL = process.env.NEXT_PUBLIC_OPENMETEO_API_BASE_URL

type WeatherParams = {
  latitude: number
  longitude: number
  current?: string | string[]
  daily?: string | string[]
  timezone: string
}

type Coordinates = { lat: number; lon: number }

export type Weather = {
  current: { time: Date; interval: number; temperature_2m: number }
  current_units: { interval: string; temperature_2m: string; time: string }
  daily: {
    apparent_temperature_max: number[]
    apparent_temperature_min: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    time: Date[]
  }
  daily_units: {
    time: string
    temperature_2m_max: string
    temperature_2m_min: string
    apparent_temperature_max: string
    apparent_temperature_min: string
  }
  elevation: number
  generationtime_ms: number
  latitude: number
  longitude: number
  timezone: string
  timezone_abbreviation: string
  utc_offset_seconds: number
}

export const searchLocationWeatherByCoordinates = async (pos: Coordinates) => {
  try {
    const { lat, lon } = pos

    const url = insertQueryParamsOnURL<WeatherParams>(BASE_URL, {
      latitude: lat,
      longitude: lon,
      current: "temperature_2m",
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_min"
      ],
      timezone: "America/Sao_Paulo"
    })

    const res = await fetch(url)

    if (!res.ok) {
      throw new OpenMeteoError("Faield to fetch weather data by coordinates.", res.status, url)
    }

    return (await res.json()) as Weather
  } catch (err) {
    printOpenMeteoError(err)
    throw err
  }
}
