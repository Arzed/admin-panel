"use client"

import * as React from "react"
import { useSearchParams } from "next/navigation"
import { signIn } from "next-auth/react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Icons } from "./Icons"

export function UserAuthForm() {
  const [isGoogleLoading, setIsGoogleLoading] = React.useState<boolean>(false)
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') as string

  const login = async () => {
    setIsGoogleLoading(true)
    await signIn('google', { callbackUrl })
  }

  return (
    <div className={cn("grid gap-6")}>
      <button
        type="button"
        className={cn(buttonVariants({ variant: "outline" }))}
        onClick={login}
        disabled={isGoogleLoading}
      >
        {isGoogleLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </button>
    </div>
  )
}