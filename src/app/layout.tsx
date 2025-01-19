import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'
import { AppProvider } from '@/provider/app-provider'
import { ModeToggle } from '@/components/mode-toogle'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Tire service control',
  description: 'Tire service control system for the wheel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          <AppSidebar />
          <main className='flex flex-col w-full h-full'>
            <SidebarTrigger />
            <div className='fixed top-2 right-2 z-50 rounded-full w-10 h-10'>
              <ModeToggle />
            </div>
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  )
}
