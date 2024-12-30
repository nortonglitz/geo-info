import Image from "next/image"
import Link from "next/link"

export const Topbar = () => {
  return (
    <header className="flex items-center shadow-sm h-14 px-14 bg-white">
      <nav>
        <Link href="/">
          <Image
            className="h-full w-auto"
            src="/geo-info_big.png"
            width={400}
            height={100}
            alt="Geo Info Brand"
          />
        </Link>
      </nav>
    </header>
  )
}
