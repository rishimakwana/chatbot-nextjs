import { useMediaQuery } from '@mui/material'
import DesktopSidebar from './components/desktopSidebar/DesktopSidebar.component'
import MobileSidebar from './components/mobileSidebar/MobileSidebar.component'
import { useReduxSelector } from '@/hooks'

export default function Sidebar() {
  const isLgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'))
  const sidebarDrawerDesktop = useReduxSelector((state) => state.layout.sidebarDrawerDesktop)

  if (isLgUp && sidebarDrawerDesktop) {
    return <DesktopSidebar />
  }
  return <MobileSidebar />
}
