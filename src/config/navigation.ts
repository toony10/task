import {
  Home,
  BookOpen,
  ShoppingBag,
  MessageSquare,
  GraduationCap,
  Info,
  Phone,
  Settings,
  type LucideIcon
} from 'lucide-react'

export type NavSubItem = {
  title: string
  url: string
}

export type NavItem = {
  title: string
  url: string
  icon: LucideIcon
  isActive?: boolean
  items?: NavSubItem[]
}

export type NavGroup = {
  label?: string
  items: NavItem[]
}

export const navigation: NavGroup[] = [
  {
    items: [
      {
        title: 'الصفحة الرئيسية',
        url: '/',
        icon: Home,
        isActive: true,
        items: [
          { title: 'الهيرو سيكشن', url: '/hero' },
          { title: 'الإحصائيات', url: '/statistics' },
          { title: 'المميزات', url: '/features' }
        ]
      },
      {
        title: 'الموسوعة',
        url: '/encyclopedia',
        icon: BookOpen,
        items: [
          { title: 'المقالات', url: '/encyclopedia/articles' },
          { title: 'الفئات', url: '/encyclopedia/categories' }
        ]
      },
      {
        title: 'المتجر',
        url: '/store',
        icon: ShoppingBag
      },
      {
        title: 'المنتدى',
        url: '/forum',
        icon: MessageSquare
      },
      {
        title: 'الأكاديمية',
        url: '/academy',
        icon: GraduationCap
      },
      {
        title: 'من نحن',
        url: '/about',
        icon: Info
      },
      {
        title: 'تواصل معنا',
        url: '/contact',
        icon: Phone
      }
    ]
  },
  {
    items: [
      {
        title: 'الإعدادات',
        url: '/settings',
        icon: Settings
      }
    ]
  }
]

export const user = {
  name: 'محمد علي',
  email: 'mohamedali32@gmail.com',
  avatar: '/avatars/user.jpg'
}

