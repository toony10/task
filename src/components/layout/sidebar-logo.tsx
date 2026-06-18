import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from '@/components/ui/sidebar'
import Logo from '@/components/shared/Logo'

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" asChild className="hover:bg-transparent">
          <Logo width={ 200 } height={ 200 } />
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}

