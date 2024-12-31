"use client"

import { useEffect, useState } from "react"
import { LocationDetailsTable } from "./LocationDetailsTable"
import { useParams } from "next/navigation"
import { ILocationDetails, searchLocationDetailsById } from "@/services/nominatim"

export default function PlaceDetail() {
  const { id } = useParams()
  const [locDetails, setLocDetails] = useState<null | undefined | ILocationDetails>(undefined)

  const searchLocationDetails = async () => {
    try {
      setLocDetails((await searchLocationDetailsById(id as string)) as ILocationDetails)
    } catch {
      setLocDetails(null)
    } finally {
    }
  }

  useEffect(() => {
    if (id && typeof id == "string") {
      searchLocationDetails()
    }
  }, [id])

  return (
    <main className="flex justify-center">
      <article className="w-1/2">
        <h1 className="text-3xl text-blue-800 font-medium border-b my-10">
          {locDetails && locDetails.name}
        </h1>
        <section className="grid grid-cols-3">
          {locDetails && <LocationDetailsTable details={locDetails} />}
        </section>
      </article>
    </main>
  )
}
