import "@/styles/globals.css"
import { Metadata } from "next"

import { ThemeProvider } from "@/components/ThemeProvider"
import Provider from "@/components/Provider"
import { cn } from "@/lib/utils"
import { fontSans } from "@/lib/fonts"

export const metadata: Metadata = {
  title: {
    default: 'siteConfig.name',
    template: `%s - ${'siteConfig.name'}`,
  },
  description: 'siteConfig.description',
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased overflow-hidden",
            fontSans.variable
          )}>
          <Provider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <div>{children}</div>
            </ThemeProvider>
          </Provider>
        </body>
      </html>
    </>
  )
}