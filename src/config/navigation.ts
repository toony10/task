import {
  Home,
  Settings,
  HelpCircle,
  type LucideIcon,
  ChartArea
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
        title: 'Stastics',
        url: '/stastics',
        icon: ChartArea,
        isActive: true
      }
    ]
  }
]

export const user = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  avatar: '/avatars/user.jpg'
}
