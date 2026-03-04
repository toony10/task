'use client'

import { useState, useMemo, useCallback, useRef, useEffect, useEffectEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { SidebarInput } from '@/components/ui/sidebar'
import { navigation, type NavItem } from '@/config/navigation'
import { cn } from '@/lib/utils'

type SearchResult = {
  title: string
  url: string
  icon?: NavItem['icon']
  parent?: string
}

function flattenNavigation(): SearchResult[] {
  const results: SearchResult[] = []

  for (const group of navigation) {
    for (const item of group.items) {
      results.push({
        title: item.title,
        url: item.url,
        icon: item.icon
      })

      if (item.items) {
        for (const subItem of item.items) {
          results.push({
            title: subItem.title,
            url: subItem.url,
            parent: item.title
          })
        }
      }
    }
  }

  return results
}

export function SearchForm() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const allPages = useMemo(() => flattenNavigation(), [])

  const filteredResults = useMemo(() => {
    if (!query.trim()) return []

    const searchTerm = query.toLowerCase().trim()
    return allPages.filter(page =>
      page.title.toLowerCase().includes(searchTerm) ||
      page.parent?.toLowerCase().includes(searchTerm)
    )
  }, [query, allPages])

  const handleSelect = useCallback((result: SearchResult) => {
    router.push(result.url)
    setQuery('')
    setIsOpen(false)
    inputRef.current?.blur()
  }, [router])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (!isOpen || filteredResults.length === 0) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev < filteredResults.length - 1 ? prev + 1 : 0
        )
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : filteredResults.length - 1
        )
        break
      case 'Enter':
        e.preventDefault()
        if (filteredResults[selectedIndex]) {
          handleSelect(filteredResults[selectedIndex])
        }
        break
      case 'Escape':
        e.preventDefault()
        setIsOpen(false)
        setQuery('')
        inputRef.current?.blur()
        break
    }
  }, [isOpen, filteredResults, selectedIndex, handleSelect])

  useEffectEvent(() => {
    setSelectedIndex(0)
  })

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={ containerRef } className="relative">
      <form onSubmit={ e => e.preventDefault() }>
        <SidebarInput
          ref={ inputRef }
          placeholder="ابحث عن صفحة..."
          className="pr-8 text-right"
          dir="rtl"
          value={ query }
          onChange={ e => {
            setQuery(e.target.value)
            setIsOpen(e.target.value.trim().length > 0)
          } }
          onFocus={ () => {
            if (query.trim()) setIsOpen(true)
          } }
          onKeyDown={ handleKeyDown }
        />
        <Search className="pointer-events-none absolute right-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
      </form>

      { isOpen && filteredResults.length > 0 && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 max-h-64 overflow-auto rounded-md border bg-popover p-1 shadow-lg">
          { filteredResults.map((result, index) => {
            const Icon = result.icon
            return (
              <button
                key={ result.url }
                type="button"
                className={ cn(
                  'flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-right outline-none transition-colors',
                  index === selectedIndex
                    ? 'bg-accent text-accent-foreground'
                    : 'hover:bg-accent hover:text-accent-foreground'
                ) }
                onClick={ () => handleSelect(result) }
                onMouseEnter={ () => setSelectedIndex(index) }
                dir="rtl"
              >
                { Icon && <Icon className="size-4 shrink-0 text-muted-foreground" /> }
                <span className="flex-1 truncate">{ result.title }</span>
                { result.parent && (
                  <span className="text-xs text-muted-foreground">
                    { result.parent }
                  </span>
                ) }
              </button>
            )
          }) }
        </div>
      ) }

      { isOpen && query.trim() && filteredResults.length === 0 && (
        <div className="absolute top-full right-0 left-0 z-50 mt-1 rounded-md border bg-popover p-3 text-center text-sm text-muted-foreground shadow-lg" dir="rtl">
          لا توجد نتائج لـ &quot;{ query }&quot;
        </div>
      ) }
    </div>
  )
}
