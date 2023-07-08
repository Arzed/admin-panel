/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Icons } from './Icons'
import { signOut, useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import { Skeleton } from './ui/skeleton'

const AccountToggle = () => {
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/auth/login?callbackUrl=/dashboard')
    }
  })
  const img = session?.user?.image as string

  if (status === 'loading') {
    return (
      <Skeleton className='h-9 w-9 rounded-full' />
    )
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img src={img} alt="" referrerPolicy='no-referrer' className="h-9 w-9 rounded-full before:hover:bg-slate-100/10 cursor-pointer" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
          <DropdownMenuItem>
              <Icons.user className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => signOut()}>
              <Icons.door className="mr-2 h-4 w-4" />
              <span>Log out</span>
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default AccountToggle