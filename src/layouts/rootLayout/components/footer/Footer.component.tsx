import { Stack, Typography } from '@mui/material'

export default function Footer() {
  return (
    <>
      <Stack  component="footer" direction={'row'} justifyContent={'space-between'} px={4} py={2} sx={{bgcolor: 'background.paper'}}>
          <Typography fontSize={10}>Copyright © 2025 chatbot. All right reserved.</Typography>
          <Typography fontSize={10}>Privacy Policy | Terms & Conditions</Typography>
      </Stack>
    </>
  )
}
