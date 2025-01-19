'use client'

import { ThemeProvider } from '@/components/theme-provider'
import { SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/toaster'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

export function AppProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [queryClient] = useState(new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider>{children}</SidebarProvider>
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  )
}
