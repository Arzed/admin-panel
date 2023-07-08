'use client'

import React, { useState } from 'react'
import { Icons } from './Icons'
import Link from 'next/link'


const ProductLink = () => {
  const [isShowLink, setIsShowLink] = useState(false)

  const showLink = () => {
    setIsShowLink(!isShowLink)
  }
  return (
    <>
    <button onClick={showLink} className="w-full relative mt-1 px-[0.2rem]">
      <div className="relative">
        <a className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-150 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
          <Icons.box className="h-5 w-5 mr-2" />
          <span>Products</span>
          <span className={isShowLink ? "shrink-0 transition duration-300 -rotate-180 absolute right-2" : 'transition duration-300 absolute right-2'}>
            <Icons.chevronDown />
          </span>
        </a>
      </div>
    </button>
    {isShowLink && (
      <>
      <ul className="relative mt-1 px-[0.2rem]">
        <li className="relative">
          <Link href={'/dashboard/products/allProducts'} className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-150 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
            <Icons.openBox className="h-5 w-5 ml-4 mr-2" />
            <span>All products</span>
          </Link>
        </li>
      </ul>
      <ul className="relative mt-1 list-none px-[0.2rem]">
        <li className="relative">
          <Link href={'/dashboard/products/category'} className="flex h-12 cursor-pointer items-center truncate rounded-[5px] px-6 py-4 text-[0.875rem] text-gray-600 outline-none transition duration-150 ease-linear hover:bg-slate-50 hover:text-inherit hover:outline-none focus:bg-slate-50 focus:text-inherit focus:outline-none active:bg-slate-50 active:text-inherit active:outline-none data-[te-sidenav-state-active]:text-inherit data-[te-sidenav-state-focus]:outline-none motion-reduce:transition-none dark:text-gray-300 dark:hover:bg-white/10 dark:focus:bg-white/10 dark:active:bg-white/10">
            <Icons.list className="h-5 w-5 ml-4 mr-2" />
            <span>Category</span>
          </Link>
        </li>
      </ul>
      </>
    )}
    </>
  )
}

export default ProductLink