'use client'

import { HandPlatter, Inbox, LayoutList, LogOutIcon } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuth } from '@/provider/auth-provider'
import { Button } from './ui/button'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

// Menu items.
const items = [
  {
    title: 'Precios de Servicios',
    url: '/services-prices',
    icon: HandPlatter,
  },
  {
    title: 'Reparaciones de Tripas',
    url: '/rubber-repair',
    icon: Inbox,
  },
  {
    title: 'Registros de Reparaciones',
    url: '/payments-services',
    icon: LayoutList,
  },
]

export function AppSidebar() {
  const { isAuthenticated, logout } = useAuth()

  if (!isAuthenticated) {
    return <></>
  }

  return (
    <Sidebar>
      <SidebarHeader className='flex flex-row items-center mt-4'>
        <Avatar>
          <AvatarImage src='./logo.jpg' />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Servicios</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Button onClick={logout}>
                  <LogOutIcon />
                  <span>Cerrar Sesion</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  )
}
