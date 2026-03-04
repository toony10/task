import Link from 'next/link'
import { navigation } from '@/config/navigation'
import { cn } from '@/lib/utils'

export default function MainPage() {
  // Flatten all navigation items from all groups
  const allMainPages = navigation.flatMap(group => group.items)

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-foreground">الصفحات الرئيسية</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        { allMainPages.map((item) => {
          const hasSubItems = item.items && item.items.length > 0

          return (
            <Link
              key={ item.url }
              href={ item.url }
              className={ cn(
                'group relative flex flex-col items-center justify-center p-6 rounded-lg border transition-all duration-300',
                'hover:shadow-lg hover:border-primary/50 hover:-translate-y-1',
                'bg-card border-border hover:bg-accent/50',
                'min-h-[140px]'
              ) }
            >
              <div className="flex flex-col items-center gap-3">
                <div className={ cn(
                  'p-3 rounded-full bg-primary/10 transition-colors',
                  'group-hover:bg-primary/20'
                ) }>
                  <item.icon className="w-6 h-6 text-primary" />
                </div>

                <span className="font-semibold text-center text-foreground group-hover:text-primary transition-colors">
                  { item.title }
                </span>

                { hasSubItems && (
                  <span className="text-xs text-muted-foreground">
                    { item.items?.length } صفحة فرعية
                  </span>
                ) }
              </div>
            </Link>
          )
        }) }
      </div>
    </div>
  )
}
