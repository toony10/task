'use client'

import { usePathname } from 'next/navigation'
import { navigation, type NavItem, type NavSubItem } from '@/config/navigation'

type SubPagesResult = {
  parentItem: NavItem | null
  subPages: NavSubItem[]
  currentSubPage: NavSubItem | null
  hasSubPages: boolean
}

export function useSubPages(): SubPagesResult {
  const pathname = usePathname()

  // Find the parent navigation item that matches current path
  let parentItem: NavItem | null = null
  let currentSubPage: NavSubItem | null = null

  for (const group of navigation) {
    for (const item of group.items) {
      // Check if current path matches this item's URL
      const isMainPage = pathname === item.url
      const isSubPage = item.items?.some(sub => pathname === sub.url || pathname.startsWith(sub.url + '/'))
      const isNestedPage = item.url !== '/' && pathname.startsWith(item.url + '/')

      if (isMainPage || isSubPage || isNestedPage) {
        parentItem = item

        // Find current sub page if we're on one
        if (item.items) {
          currentSubPage = item.items.find(sub =>
            pathname === sub.url || pathname.startsWith(sub.url + '/')
          ) || null
        }
        break
      }
    }
    if (parentItem) break
  }

  return {
    parentItem,
    subPages: parentItem?.items || [],
    currentSubPage,
    hasSubPages: (parentItem?.items?.length || 0) > 0
  }
}

