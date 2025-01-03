"use client"
import { Weather } from "@/services/open-meteo"
import { Spinner } from "@/components"
import {
  IconDatabaseOff,
  IconTemperature,
  IconDroplets,
  IconClock,
  IconCloudRain,
  IconCalendarMonth
} from "@tabler/icons-react"
import { getWeatherDescriptionFromCode } from "@/libs/weather"

interface ILocationCurrentWeather {
  data?: Weather | null
  className?: string
}

const iconsSize = "1.4rem"
const iconsStroke = "1px"

export const LocationCurrentWeather = ({ data, className }: ILocationCurrentWeather) => {
  // Placeholder carregamento
  if (data === undefined) {
    return (
      <div
        className={`
            bg-white
            border-neutral-200
            border
            rounded-xl
            overflow-hidden
            h-48
            flex
            justify-center
            items-center
            ${className}
          `}
      >
        <Spinner />
      </div>
    )
  }

  // Placeholder erro
  if (data === null) {
    return (
      <div
        className={`
            bg-white
            border-neutral-200
            border
            rounded-xl
            overflow-hidden
            h-48
            flex
            flex-col
            justify-center
            items-center
            ${className}
          `}
      >
        <IconDatabaseOff className="w-10 h-10 text-neutral-200" />
        <p className="text-neutral-400">Problema no servidor</p>
      </div>
    )
  }

  return (
    <article
      className={`
        bg-white
        border
        border-neutral-200
        rounded-xl
        flex
        overflow-hidden

        [&_section]:py-4

        [&_span]:text-xl
        [&_span]:md:text-2xl

        ${className}
      `}
    >
      <section className="w-3/5 grid grid-cols-7 items-center gap-8">
        <div className="col-span-7 m-auto lg:col-span-3 relative w-full flex justify-center">
          {/*eslint-disable-next-line @next/next/no-img-element*/}
          <img
            src={`/assets/icons/weather/animated/${data.current.is_day ? "day" : "night"}/${data.current.weather_code}.svg`}
            alt="weather now icon"
            title={getWeatherDescriptionFromCode(data.current.weather_code)}
            className="h-32 object-contain cursor-help"
          />
          <p className="text-neutral-400 text-center absolute -bottom-2 right-0 left-0 text-sm text-nowrap">
            {getWeatherDescriptionFromCode(data.current.weather_code)}
          </p>
        </div>
        <div
          className="
            flex
            justify-evenly
            col-span-7
            lg:col-span-4

            [&>div]:flex
            [&>div]:flex-col
            [&>div]:items-center
            [&>div]:cursor-help
          "
        >
          <div title="Temperatura agora">
            <IconTemperature
              size={iconsSize}
              stroke={iconsStroke}
            />
            <span>
              {Math.round(data.current.temperature_2m) + data.current_units.temperature_2m}
            </span>
          </div>
          <div title="Umidade relativa do ar">
            <IconDroplets
              size={iconsSize}
              stroke={iconsStroke}
            />
            <span>
              {data.current.relative_humidity_2m + data.current_units.relative_humidity_2m}
            </span>
          </div>
          <div title="Precipitação acumulada do dia">
            <IconCloudRain
              size={iconsSize}
              stroke={iconsStroke}
            />
            <span>{data.current.precipitation + data.current_units.precipitation}</span>
          </div>
        </div>
      </section>
      <section
        className="
          bg-neutral-100
          w-2/5
          flex
          flex-wrap
          items-center
          justify-evenly
          gap-4
          px-4
          
          [&>div]:flex
          [&>div]:flex-col
          [&>div]:items-center
          [&>div]:text-center
          [&>div]:cursor-help
        "
      >
        <div title="Horário local">
          <IconClock
            size={iconsSize}
            stroke={iconsStroke}
          />
          <span>
            {new Date(data.current.time).toLocaleString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit"
            })}
          </span>
        </div>
        <div title="Data local">
          <IconCalendarMonth
            size={iconsSize}
            stroke={iconsStroke}
          />
          <span>
            {new Date(data.current.time).toLocaleString("pt-BR", {
              weekday: "short",
              day: "2-digit",
              month: "long"
            })}
          </span>
        </div>
      </section>
    </article>
  )
}
