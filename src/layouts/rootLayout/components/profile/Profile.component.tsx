import { Avatar, Box, IconButton, Stack, Typography } from '@mui/material'

import { useReduxSelector } from '@/hooks'
import { style } from './Profile.style'
import { IoSettingsOutline } from 'react-icons/io5'

export default function Profile() {
  const { userData, isLoggedIn } = useReduxSelector((state) => state.user)

  return (
    <Stack sx={style.root}>
      <Avatar sx={style.avatar}>S</Avatar>
      <Box flex={1}>
        <Typography variant="body2">Steve Smith</Typography>
        <Typography variant="body2" color="text.secondary">
          steve@example.com
        </Typography>
      </Box>
      <IconButton size="small">
        <IoSettingsOutline size={20} />
      </IconButton>
    </Stack>
  )
}
