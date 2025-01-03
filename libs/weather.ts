import { WeatherCode } from "@/services/open-meteo"

const weatherDescriptions: Record<WeatherCode, string> = {
  0: "Céu claro",
  1: "Predominante claro",
  2: "Parcialmente nublado",
  3: "Nublado",
  45: "Névoa",
  48: "Névoa com geada",
  51: "Chuvisco leve",
  53: "Chuvisco moderado",
  55: "Chuvisco intenso",
  56: "Chuvisco congelante leve",
  57: "Chuvisco congelante intenso",
  61: "Chuva leve",
  63: "Chuva moderada",
  65: "Chuva forte",
  66: "Chuva congelante leve",
  67: "Chuva congelante forte",
  71: "Queda de neve",
  73: "Queda de neve moderada",
  75: "Queda de neve forte",
  77: "Grãos de neve",
  80: "Pancadas de chuva leve",
  81: "Pancadas de chuva moderadas",
  82: "Pancadas de chuva forte",
  85: "Pancadas de neve leve",
  86: "Pancadas de neve forte",
  95: "Tempestade",
  96: "Tempestade moderada com granizo",
  99: "Tempestade muito forte com granizo"
}

export const getWeatherDescriptionFromCode = (code: WeatherCode) =>
  weatherDescriptions[code] || "Código desconhecido"
