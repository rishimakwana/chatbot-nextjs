import { useState } from 'react'
import { IoSettingsOutline } from 'react-icons/io5'
import { Avatar, Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Stack, Typography } from '@mui/material'

import { useReduxSelector } from '@/hooks'
import { style } from './Profile.style'
import ConfirmationPopup from '@/components/confirmationPopup/ConfirmationPopup.component'
import { handleLogout } from '@/utils'
import { TMenuOption } from '@/types'
import { MdPerson, MdLogout } from 'react-icons/md'

export default function Profile() {
  const { userData } = useReduxSelector((state) => state.user)
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const [profileAnchorEl, setProfileAnchorEl] = useState<HTMLElement | null>(null)

  const handleOpenProfileMenu = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchorEl(event.currentTarget)
  }

  const handleCloseProfileMenu = () => {
    setProfileAnchorEl(null)
  }

  const handleLogoutClick = () => {
    handleCloseProfileMenu()
    setShowLogoutPopup(true)
  }

  const PROFILE_OPTIONS: TMenuOption[] = [
    { label: 'Profile', Icon: MdPerson, link: '#' },
    { label: 'Logout', Icon: MdLogout, onClick: () => handleLogoutClick() },
  ]
  return (
    <Stack sx={style.root}>
      <Avatar sx={style.avatar}>{userData?.fullName ? userData.fullName.charAt(0) : 'U'}</Avatar>

      <Stack>
        <Box flex={1}>
          {userData?.fullName && (
            <Typography variant="body2" color="text.secondary" sx={{ display: 'block', wordBreak: 'break-word' }}>
              {userData?.fullName}
            </Typography>
          )}
          {userData?.email && (
            <Typography variant="body2" color="text.secondary" sx={{ display: 'block', wordBreak: 'break-word' }}>
              {userData?.email}
            </Typography>
          )}
        </Box>
      </Stack>

      {/* Settings IconButton to open menu */}
      <IconButton size="small" onClick={handleOpenProfileMenu}>
        <IoSettingsOutline size={20} />
      </IconButton>

      {/* Profile Menu */}
      <Menu
        anchorEl={profileAnchorEl}
        open={!!profileAnchorEl}
        onClose={handleCloseProfileMenu}
        keepMounted
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        {PROFILE_OPTIONS.map((item, index) => (
          <MenuItem key={index} onClick={item.onClick || handleCloseProfileMenu}>
            {item.Icon && (
              <ListItemIcon>
                <item.Icon />
              </ListItemIcon>
            )}
            <ListItemText>{item.label}</ListItemText>
        ))}
      </Menu>

      {/* Logout Confirmation Popup */}
      {showLogoutPopup && (
        <ConfirmationPopup
          heading="Logout"
          subheading="Are you sure you want to Logout?"
          cancelButtonText="No"
          acceptButtonText="Yes"
          onCancel={() => setShowLogoutPopup(false)}
          onAccept={() => {
            setShowLogoutPopup(false)
            handleLogout()
          }}
        />
      )}
    </Stack>
  )
}
