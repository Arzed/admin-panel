import Link from 'next/link'
import { Icons } from './Icons'
import ProductLink from './ProductLink'

function Sidebar() {

  return (
    <nav className="lg:h-[590px] w-80 overflow-hidden dark:bg-gray-950">
      <ul className="relative mt-1 list-none px-[0.2rem]">
        <li className="relative">
          <Link href={'/dashboard'} className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-150 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
            <Icons.home className="h-5 w-5 mr-2" />
            <span>Dashboard</span>
          </Link>
        </li>
      </ul>
      <ProductLink />
      <ul className="relative mt-1 list-none px-[0.2rem]">
        <li className="relative">
          <a className="flex h-12 items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-150 ease-linear focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none motion-reduce:transition-none dark:text-gray-300 dark:focus:bg-white/10 dark:active:bg-white/10">
            <Icons.cart className="h-5 w-5 mr-2" />
            <span className='text-opacity-75'>Orders (Uncreated)</span>
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Sidebar