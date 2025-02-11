import { Avatar, Stack, Typography } from '@mui/material'

import { useReduxSelector } from '@/hooks'
import { style } from './Profile.style'

export default function Profile() {
  const { userData } = useReduxSelector((state) => state.user)

  return (
    <Stack sx={style.root}>
      <Avatar sx={style.avatar} />
      <Typography variant="h3" color="text.primary">
        {userData.fullName}
      </Typography>
    </Stack>
  )
}
