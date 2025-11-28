import Link from "next/link"

const NavLinkClasses = `
    py-4 
    px-12 
    flex 
    items-center 
    relative 
    uppercase 
    font-black 
    text-[1em] 
    bg-none 
    border-0 
    cursor-pointer 
    [@media(max-width:810px)]:text-[10px] 
    [@media(max-width:810px)]:py-0 
    [@media(max-width:810px)]:px-2.5 
    [&::before]:[content:''] 
    [&::before]:w-0.5
    [&::before]:bg-lightGray
    [&::before]:h-full
    [&::before]:absolute
    [&::before]:left-0
    [&::before]:top-0
    [&::before]:bottom-0
    [&::before]:skew-x-[-20deg]
    [&::after]:h-0.5
    [&::after]:bg-red
    [&::after]:absolute
    [&::after]:[content:'']
    [&::after]:w-0
    [&::after]:translate-x-[-50%]
    [&::after]:left-1/2
    [&::after]:mt-8
    [&::after]:transition-[width]
    [&::after]:duration-400
    [&::after]:ease-[cubic-bezier(1,-0.65,0,2.31)]
    [&:hover]:outline-none
    [&:hover]:[&::after]:w-[calc(100%-60px)]
    [&:hover]:[@media(max-width:810px)]:w-[calc(100%-10px)]
    focus:outline-none
    focus:[&::after]:w-[calc(100%-60px)]
    focus:[@media(max-width:810px)]:w-[calc(100%-10px)]
    [@media(max-width:1300px)]:border-t
    [@media(max-width:1300px)]:border-lightGray
    [@media(max-width:1300px)]:w-full
    [@media(max-width:1300px)]:justify-center
    [@media(max-width:1300px)]:text-[1.5rem]
    `
// const NavButtonClasses = NavLinkClasses

const NavLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => (
  <Link href={href} className={NavLinkClasses}>
    {children}
  </Link>
)

export const Nav = () => {
  return (
    <ul className="m-0 p-0 flex justify-self-end text-[2rem]">
      <NavLink href="/products">Products</NavLink>
      <NavLink href="/sell">Sell</NavLink>
      <NavLink href="/orders">Orders</NavLink>
      <NavLink href="/account">Account</NavLink>
    </ul>
  )
}
