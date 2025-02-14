import { useState } from 'react'
import { useRouter } from 'next/router'

import MessageInput from '@/components/messageInput/MessageInput.component'
import { useReduxDispatch } from '@/hooks'
import { useAddSessionMutation } from '@/redux/api/chat.api'
import { addMessage } from '@/redux/slice/chat.slice'
import { TPage } from '@/types'
import Header from '@/components/header/Header.component'
import { Stack, Typography } from '@mui/material'

const Home: TPage = () => {
  const router = useRouter()
  const dispatch = useReduxDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [addSession] = useAddSessionMutation()

  const handleMessage = async (message: string) => {
    try {
      setIsLoading(true)
      const { sessionId } = await addSession().unwrap()
      dispatch(addMessage({ sessionId, messages: [{ type: 'question', content: message, isNewChat: true }] }))
      router.push(`/chat/${sessionId}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Header />
      <Stack bgcolor={'background.paper'} sx={{ height: 'calc(100vh - 137px)', flexGrow: 1, justifyContent: 'center' }}>
        <Stack alignItems={'center'} justifyContent={'center'} gap={2.5}>
          <Typography variant="display2" fontSize={'34px'} fontWeight={400} lineHeight={'24px'} textAlign={'center'} sx={{ width: { xs: '60%', sm: '80%', lg: '100%' } }}>
            What do you want to know?
          </Typography>
          <MessageInput loading={isLoading} onMessage={handleMessage} />
        </Stack>
      </Stack>
    </>
  )
}

Home.rootLayoutProps = {
  title: 'Home',
  pageType: 'public',
}

export default Home
