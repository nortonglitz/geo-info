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
  latitude: number
  longitude: number
  generationtime_ms: number
  utc_offset_seconds: number
  timezone: string
  timezone_abbreviation: string
  elevation: number
  current_units: {
    time: string
    interval: string
    temperature_2m: string
    relative_humidity_2m: string
    apparent_temperature: string
    is_day: string
    precipitation: string
    weather_code: string
  }
  current: {
    time: string
    interval: number
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    is_day: number
    precipitation: number
    weather_code: number
  }
  daily_units: {
    time: string
    weather_code: string
    temperature_2m_max: string
    temperature_2m_min: string
    daylight_duration: string
    uv_index_max: string
    precipitation_probability_max: string
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    daylight_duration: number[]
    uv_index_max: number[]
    precipitation_probability_max: number[]
  }
}

export const searchLocationWeatherByCoordinates = async (pos: Coordinates) => {
  try {
    const { lat, lon } = pos

    const url = insertQueryParamsOnURL<WeatherParams>(BASE_URL, {
      latitude: lat,
      longitude: lon,
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "precipitation",
        "weather_code"
      ],
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "daylight_duration",
        "uv_index_max",
        "precipitation_probability_max"
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
