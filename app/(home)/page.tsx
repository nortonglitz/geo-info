"use client"
import { useCallback, useState } from "react"
import { List } from "./List"
import { debounce } from "@/libs/debounce"

export default function Home() {
  const [query, setQuery] = useState("")
  const debouncedQuery = useCallback(
    debounce((value: string) => {
      setQuery(value)
    }, 500),
    []
  )

  return (
    <main className="flex justify-center">
      <article className="flex flex-col items-center gap-4 mt-20 md:mt-32 lg:mt-52 max-w-sm sm:max-w-md w-full">
        <h1 className="text-3xl font-medium text-blue-800 text-center">
          Qual endereço você procura?
        </h1>
        <form
          className="w-full"
          onSubmit={e => e.preventDefault()}
        >
          <input
            type="text"
            onChange={e => debouncedQuery(e.target.value)}
            autoFocus
            className="
              px-4
              py-2
              rounded-full
              w-full
              text-lg
              border
              border-neutral-200
            "
          />
        </form>
        <List query={query} />
      </article>
    </main>
  )
}
