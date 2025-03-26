import { Divider, Stack, SwipeableDrawer } from '@mui/material'

import Profile from '../../../profile/Profile.component'
import SidebarContent from '../sidebarContent/SidebarContent.component'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { setSidebarDrawer } from '@/redux/slice/layout.slice'
import { style } from './MobileSidebar.style'

export default function MobileSidebar() {
  const dispatch = useReduxDispatch()
  const sidebarDrawer = useReduxSelector((state) => state.layout.sidebarDrawer)
  const { isLoggedIn } = useReduxSelector((state) => state.user)

  return (
    <SwipeableDrawer open={sidebarDrawer} onClose={() => dispatch(setSidebarDrawer(false))} onOpen={() => '👻 ignore me'} disableSwipeToOpen keepMounted>
      <Stack component="aside" sx={style.root}>
        {/* Profile */}
        {isLoggedIn && <Profile />}

        {/* Content */}
        <SidebarContent />
      </Stack>
    </SwipeableDrawer>
  )
}
