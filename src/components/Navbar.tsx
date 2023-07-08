import Link from "next/link"
import { Icons } from "./Icons"
import { ThemeToggle } from "./ThemeToggle"
import AccountToggle from "./AccountToggle"

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <Link href="/" className="hidden items-center space-x-2 md:flex">
            <Icons.logo className="h-6 w-6" />
            <span className="hidden font-bold sm:inline-block">
                LOGO
            </span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
          <div className="flex gap-6 md:gap-10">
            </div>
            <ThemeToggle />
            <AccountToggle />
          </nav>
        </div>
      </div>
    </header>
  )
}