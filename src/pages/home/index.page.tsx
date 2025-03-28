import { useState } from 'react'
import { useRouter } from 'next/router'

import MessageInput from '@/components/messageInput/MessageInput.component'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { useAddSessionMutation, useSummarizeDocumentMutation } from '@/redux/api/chat.api'
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
  const [summarizeDocument] = useSummarizeDocumentMutation()

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

  const handleSummarize = async () => {
    try {
      // if (!sessionId) {
      // For new chat, create a session first

      const session = await addSession().unwrap()
      const newSessionId = session._id

      // Then summarize
      const { title, response } = await summarizeDocument({ sessionId: newSessionId }).unwrap()

      dispatch(
        addMessage({
          sessionId: newSessionId,
          messages: [
            { type: 'question', content: title },
            { type: 'answer', content: response },
          ],
        }),
      )

      // Only redirect after successful summarization
      router.push(`/chat/${newSessionId}`)

      // const session = await addSession().unwrap()
      // const newSessionId = session._id
      // router.push(`/chat/${newSessionId}`)

      // // Then summarize
      // const { title, summary } = await summarizeDocument({ sessionId: newSessionId }).unwrap()
      // dispatch(
      //   addMessage({
      //     sessionId: newSessionId,
      //     messages: [
      //       { type: 'question', content: 'Summarize this document' },
      //       { type: 'answer', content: summary },
      //     ],
      //   }),
      // )

      // } else {
      //   // For existing chat
      //   const { title, summary } = await summarizeDocument({ sessionId }).unwrap()
      //   dispatch(addMessage({ sessionId, messages: [
      //     { type: 'question', content: "Summarize this document" },
      //     { type: 'answer', content: summary }
      //   ]}))
      // }
    } catch (error) {
      console.error('Error summarizing document:', error)
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
          <MessageInput loading={isLoading} onMessage={handleMessage} onSummarize={handleSummarize} />
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
