'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem
} from '@/components/ui/sidebar'
import { type NavItem } from '@/config/navigation'

type NavMainProps = {
  items: NavItem[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()

  const checkIsActive = (item: NavItem) => {
    if (pathname === item.url) return true
    if (item.url !== '/' && pathname.startsWith(item.url + '/')) return true
    if (item.items?.some(subItem => pathname === subItem.url || pathname.startsWith(subItem.url + '/'))) return true
    return false
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          { items.map((item) => {
            const isActive = checkIsActive(item)
            const hasSubItems = item.items && item.items.length > 0

            if (hasSubItems) {
              return (
                <Collapsible key={ item.title } asChild defaultOpen={ isActive }>
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={ item.title } isActive={ isActive }>
                        <item.icon />
                        <span className='text-lg font-bold'>{ item.title }</span>
                        <ChevronDown className="mr-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        { item.items?.map((subItem) => {
                          const isSubActive = pathname === subItem.url

                          return (
                            <SidebarMenuSubItem key={ subItem.title }>
                              <SidebarMenuSubButton asChild isActive={ isSubActive }>
                                <Link href={ subItem.url }>
                                  <span>{ subItem.title }</span>
                                </Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          )
                        }) }
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            }

            return (
              <SidebarMenuItem key={ item.title }>
                <SidebarMenuButton asChild isActive={ isActive } tooltip={ item.title }>
                  <Link href={ item.url }>
                    <item.icon />
                    <span>{ item.title }</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }) }
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

