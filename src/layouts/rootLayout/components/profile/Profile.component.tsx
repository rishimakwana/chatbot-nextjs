import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'

import { useReduxSelector } from '@/hooks'
import { style } from './Profile.style'
import { IoSettingsOutline } from 'react-icons/io5'

export default function Profile() {
  const { userData } = useReduxSelector((state) => state.user)

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
      <IconButton size="small">
        <IoSettingsOutline size={20} />
      </IconButton>
    </Stack>
  )
}
