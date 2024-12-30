"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

interface IPlace {
  display_name: string
  name: string
  osm_id: string
  osm_type: string
}

interface IList {
  query?: string
}

export const List = ({ query }: IList) => {
  const [places, setPlaces] = useState<undefined | "error" | IPlace[]>(undefined)

  const searchQuery = async () => {
    let res = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}&format=jsonv2`)

    if (!res.ok) {
      setPlaces("error")
    }

    const data = await res.json()
    setPlaces(data)
  }

  useEffect(() => {
    if (query && query.length > 2) {
      searchQuery()
    } else {
      setPlaces(undefined)
    }
  }, [query])

  const isList = Array.isArray(places)
  const isError = places === "error"
  const isEmpty = typeof places === "undefined"

  if (isEmpty) {
    return <></>
  }

  return (
    <section
      className="
        w-full
        bg-white
        rounded-xl
        border-neutral-200
        border
        overflow-hidden
      "
    >
      {isList && places.length > 0 && (
        <ul
          className="
            max-h-80
            overflow-y-auto

            [&_a]:flex
            [&_a]:flex-col
            [&_a]:p-2
            [&_a:hover]:bg-neutral-100

            [&_li:not(:last-child)]:border-b
            [&_li:not(:last-child)]:border-neutral-200

            [&_a_:last-child]:text-neutral-400
            [&_a_:last-child]:text-xs
            [&_a_:last-child]:text-justify
          "
        >
          {(places as IPlace[]).map(({ display_name, name, osm_id, osm_type }) => (
            <li key={osm_id}>
              <Link href={`/place/${osm_type[0].toUpperCase() + osm_id}`}>
                <span>{name}</span>
                <span>{display_name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
      {isList && places.length === 0 && (
        <>
          <h2 className="text-neutral-400 text-center text-lg my-4 italic">Lugar não encontrado</h2>
          <Image
            className="w-48 m-auto"
            src="/location-lost.svg"
            width={885}
            height={708}
            alt="Not found"
          />
        </>
      )}
      {isError && "error"}
    </section>
  )
}
