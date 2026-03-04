'use client'

import { LogOut } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupContent
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'

import { SidebarLogo } from './sidebar-logo'
import { SearchForm } from './search-form'
import { NavMain } from './nav-main'
import { NavUser } from './nav-user'
import { navigation, user } from '@/config/navigation'

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar side="right" collapsible="icon" { ...props }>
      <SidebarHeader className="items-center pt-4">
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent dir="rtl" className='overflow-x-hidden'>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupContent>
            <SearchForm />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="group-data-[collapsible=icon]:hidden" />

        { navigation.map((group, index) => (
          <NavMain key={ index } items={ group.items } />
        )) }
      </SidebarContent>

      <SidebarSeparator />

      <SidebarFooter>
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        </SidebarGroup>
        <NavUser user={ user } />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

