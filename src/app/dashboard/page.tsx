'use client'

import Sidebar from '@/components/Sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Home() {
  const { data: session, status } = useSession({
    required: true,
  })

  if (status === 'loading') {
    return <Skeleton className='w-full h-40 rounded-md' />
  }
  return (
    <div>
      Logged in as : {session.user?.name}
    </div>
  )
}
