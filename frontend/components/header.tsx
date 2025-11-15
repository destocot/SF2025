import Link from "next/link"
import { Nav } from "@/components/nav"

export const Header = () => {
  return (
    <header>
      <div className="border-b-10 grid grid-cols-[auto_1fr] justify-between items-stretch">
        <Link
          href="/"
          className="text-[4rem] py-4 ml-8 relative z-2 skew-x-[-7deg] no-underline"
        >
          <h1 className="px-2 bg-red text-white uppercase">Sick Fits</h1>
        </Link>
      </div>

      <div className="grid grid-cols-[1fr_auto] border-b">
        <p>Search</p>
      </div>

      <Nav />
    </header>
  )
}
