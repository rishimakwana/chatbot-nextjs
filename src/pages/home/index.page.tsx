import { useState } from 'react'
import { useRouter } from 'next/router'

import MessageInput from '@/components/messageInput/MessageInput.component'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { useAddSessionMutation } from '@/redux/api/chat.api'
import { addMessage } from '@/redux/slice/chat.slice'
import { TPage } from '@/types'
import Header from '@/components/header/Header.component'
import { Stack, Typography } from '@mui/material'
import { addSessions } from '@/redux/slice/session.slice'

const Home: TPage = () => {
  const router = useRouter()
  const dispatch = useReduxDispatch()
  const sessions = useReduxSelector((state) => state.session.sessions)

  const [isLoading, setIsLoading] = useState(false)
  const [addSession] = useAddSessionMutation()

  const handleMessage = async (message: string) => {
    try {
      setIsLoading(true)
      const session = await addSession().unwrap()
      if (session) {
        dispatch(addMessage({ sessionId: session._id.toString(), messages: [{ type: 'question', content: message, isNewChat: true }] }))
        router.push(`/chat/${session._id}`)

        dispatch(addSessions([session, ...sessions]))
      }
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
  pageType: 'protected',
}

export default Home
