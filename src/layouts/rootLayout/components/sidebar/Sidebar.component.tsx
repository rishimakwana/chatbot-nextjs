import { useMediaQuery } from '@mui/material'
import DesktopSidebar from './components/desktopSidebar/DesktopSidebar.component'
import MobileSidebar from './components/mobileSidebar/MobileSidebar.component'

export default function Sidebar() {
  const isLgUp = useMediaQuery((state) => state.breakpoints.up('lg'))

  return isLgUp ? <DesktopSidebar /> : <MobileSidebar />
}
