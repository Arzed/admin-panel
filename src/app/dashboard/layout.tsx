import "@/styles/globals.css"
import { Navbar } from "@/components/Navbar"
import Sidebar from "@/components/Sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="relative flex flex-col">
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <ScrollArea className='max-h-[590px] w-full py-10 px-5 rounded-md border overflow-y-auto'>
          {children}
        </ScrollArea>
      </div>
    </div>
  )
}