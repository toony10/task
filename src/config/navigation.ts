import {
  Home,
  Users,
  ShoppingBag,
  BarChart3,
  FileText,
  Mail,
  Settings,
  HelpCircle,
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
        title: 'Dashboard',
        url: '/',
        icon: Home,
        isActive: true
      },
      {
        title: 'Users',
        url: '/users',
        icon: Users,
        items: [
          { title: 'All Users', url: '/users' },
          { title: 'Add User', url: '/users/add' },
          { title: 'Roles', url: '/users/roles' }
        ]
      },
      {
        title: 'Products',
        url: '/products',
        icon: ShoppingBag,
        items: [
          { title: 'All Products', url: '/products' },
          { title: 'Add Product', url: '/products/add' },
          { title: 'Categories', url: '/products/categories' }
        ]
      },
      {
        title: 'Analytics',
        url: '/analytics',
        icon: BarChart3
      },
      {
        title: 'Reports',
        url: '/reports',
        icon: FileText
      },
      {
        title: 'Messages',
        url: '/messages',
        icon: Mail
      }
    ]
  },
  {
    items: [
      {
        title: 'Settings',
        url: '/settings',
        icon: Settings
      },
      {
        title: 'Help',
        url: '/help',
        icon: HelpCircle
      }
    ]
  }
]

export const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/avatars/user.jpg'
}
