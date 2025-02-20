import { useEffect, useRef } from 'react'
import { IconButton, Stack, SwipeableDrawer } from '@mui/material'
import { GoSidebarCollapse } from 'react-icons/go'

import Logo from '@/components/logo/Logo.component'
import SidebarContent from '../sidebarContent/SidebarContent.component'
import { style } from './DesktopSidebar.style'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { setSidebarDrawer } from '@/redux/slice/layout.slice'

export default function DesktopSidebar() {
  const sidebarRef = useRef<HTMLElement | null>(null)
  const dispatch = useReduxDispatch()
  const sidebarDrawer = useReduxSelector((state) => state.layout.sidebarDrawer)

  useEffect(() => {
    const sidebarElement = sidebarRef.current!
    const events = [
      ['mouseenter', 'touchstart'],
      ['mouseleave', 'touchend'],
    ]
    const handleOverflow = (value: boolean) => (sidebarElement.style.overflow = value ? 'overlay' : 'hidden')

    events[0].map((event) => sidebarElement.addEventListener(event, () => handleOverflow(true)))
    events[1].map((event) => sidebarElement.addEventListener(event, () => handleOverflow(false)))

    return () => {
      events[0].map((event) => sidebarElement.removeEventListener(event, () => handleOverflow(true)))
      events[1].map((event) => sidebarElement.removeEventListener(event, () => handleOverflow(false)))
    }
  }, [])

  return (
    <Stack component="aside" ref={sidebarRef} sx={style.root}>
      {/* Logo */}
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Logo />
        <IconButton onClick={() => dispatch(setSidebarDrawer(!sidebarDrawer))}>
          <GoSidebarCollapse className="icon-xxl" />
        </IconButton>
      </Stack>

      {/* Menus */}
      <SidebarContent />
    </Stack>
  )
}
