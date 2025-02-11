import { Divider, Stack, SwipeableDrawer } from '@mui/material'

import Profile from '../../../profile/Profile.component'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { setSidebarDrawer } from '@/redux/slice/layout.slice'
import { style } from './MobileSidebar.style'

export default function MobileSidebar() {
  const dispatch = useReduxDispatch()
  const sidebarDrawer = useReduxSelector((state) => state.layout.sidebarDrawer)

  return (
    <>
      <SwipeableDrawer open={sidebarDrawer} onClose={() => dispatch(setSidebarDrawer(false))} onOpen={() => '👻 ignore me'} disableSwipeToOpen>
        <Stack component="aside" divider={<Divider />} spacing={3} sx={style.root}>
          {/* Profile */}
          <Profile />
          {/* Menus */}
          mobilllleee
        </Stack>
      </SwipeableDrawer>
    </>
  )
}
