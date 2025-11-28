import Link from "next/link"
import { Nav } from "@/components/layout/nav"

const Logo = () => (
  <h1 className="whitespace-nowrap text-[3rem] sm:text-[4rem] my-[0.67em] ml-8 relative z-2 bg-red skew-x-[-7deg]">
    <Link href="/" className="no-underline text-white uppercase py-2 px-4">
      Sick Fits
    </Link>
  </h1>
)

export const Header = () => {
  return (
    <header>
      <div className="border-b-10 grid grid-cols-[auto_1fr] justify-between items-stretch">
        <Logo />

        <Nav />
      </div>

      <div className="grid grid-cols-[1fr_auto] border-b">
        <p>Search</p>
      </div>
    </header>
  )
}
