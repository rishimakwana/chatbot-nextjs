import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { FiCopy, FiRefreshCcw } from 'react-icons/fi'
import { Avatar, Box, CircularProgress, Typography, IconButton, Stack, Skeleton } from '@mui/material'

import { style } from './ChatContent.style'
import { handleCopy } from '@/utils/download.utils'
import Header from '@/components/header/Header.component'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { addMessage, setLoading } from '@/redux/slice/chat.slice'
import { useGetChatHistoryQuery, useSendMessageMutation } from '@/redux/api/chat.api'
import MessageInput from '../../../../../components/messageInput/MessageInput.component'

export default function ChatContent() {
  // const messagesEndRef = useRef<HTMLDivElement>(null)
  const dispatch = useReduxDispatch()
  const [sendMessage, sendMessageApiState] = useSendMessageMutation()

  const router = useRouter()
  const sessionId = router.query.id as string
  const chatSession = useReduxSelector((state) => state.chat[sessionId] || { isLoading: false, chats: [] })
  const messages = chatSession.chats

  const chatHistoryApiState = useGetChatHistoryQuery(sessionId, {
    skip: !!messages.length || !sessionId,
  })

  useEffect(() => {
    if (!chatHistoryApiState.isSuccess || chatHistoryApiState.isFetching) return
    const formattedMessages = chatHistoryApiState.data.flatMap((msg: any) => {
      return [
        { type: 'question' as 'query', content: msg.query },
        { type: 'answer' as 'response', content: msg.response, files: msg.files_name },
      ]
    })
    dispatch(addMessage({ sessionId, messages: formattedMessages }))
  }, [chatHistoryApiState.isSuccess, chatHistoryApiState.isFetching])

  useEffect(() => {
    if (!messages[0]?.isNewChat || !router.isReady) return
    handleMessage(messages[0].content, true)
  }, [router.isReady])

  const handleMessage = async (message: string, isNewChat: boolean) => {
    if (!isNewChat) dispatch(addMessage({ sessionId, messages: [{ type: 'question', content: message }] }))
    dispatch(setLoading({ sessionId, isLoading: true }))

    const { response, files_name } = await sendMessage({ session_id: sessionId, query: message, isNewChat }).unwrap()
    dispatch(addMessage({ sessionId, messages: [{ type: 'answer', content: response, files: files_name }] }))
    dispatch(setLoading({ sessionId, isLoading: false }))
  }

  return (
    <>
      <Header />
      <Stack bgcolor={'background.paper'} sx={{ height: 'calc(100vh - 137px)', flexGrow: 1, justifyContent: !sessionId ? 'center' : 'flex-start' }}>
        {!sessionId ? (
          <Stack alignItems={'center'} justifyContent={'center'} gap={2.5}>
            <Typography variant="display2" fontSize={'34px'} fontWeight={400} lineHeight={'24px'} textAlign={'center'} sx={{ width: { xs: '60%', sm: '80%', lg: '100%' } }}>
              What do you want to know?
            </Typography>
            <MessageInput loading={sendMessageApiState.isLoading} onMessage={(message) => handleMessage(message, false)} />
          </Stack>
        ) : (
          <>
            {chatHistoryApiState.isLoading ? (
              <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
            ) : (
              <Stack p={4} pt={0} pb={0} gap={3} height={1}>
                <Stack spacing={3} flexGrow={1} overflow={'auto'}>
                  {messages.map((message, index) => (
                    <Stack key={index} gap={2} p={1} alignItems={'flex-start'} direction={message.type === 'question' ? 'row-reverse' : 'row'}>
                      {message.type === 'answer' && (
                        <Stack sx={style.bot_avatar}>
                          <Image src={'/images/non_lablel_ogo.svg'} alt="bot-avatar" width={24} height={24} />
                        </Stack>
                      )}
                      {message.type === 'question' && <Avatar sx={{ width: 40, height: 40, bgcolor: message.type === 'question' ? 'primary.light' : 'grey.300' }} />}
                      <Stack flexDirection={'column'} alignItems={'flex-end'}>
                        <Box sx={{ background: message.type === 'question' ? 'primary.light' : '#EBECF0', p: 1, borderRadius: 2, border: message.type === 'question' ? '1px solid #E0E0E0' : '1px solid #EBECF0' }}>
                          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                            {message.content}
                          </Typography>
                        </Box>
                        {message.type !== 'question' && (
                          <Stack direction={'row'} gap={1}>
                            <IconButton onClick={() => handleCopy(message.content)}>
                              <FiCopy fontSize="small" />
                            </IconButton>
                            <IconButton onClick={() => handleCopy(message.content)}>
                              <FiRefreshCcw fontSize="small" />
                            </IconButton>
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  ))}
                  {chatSession.isLoading && (
                    <Stack direction={'row'} alignItems={'center'} gap={2} p={1}>
                      <Stack sx={style.bot_avatar}>
                        <Image src={'/images/non_lablel_ogo.svg'} alt="bot-avatar" width={24} height={24} />
                      </Stack>
                      <Skeleton variant="text" animation="wave" width={210} height={60} />
                    </Stack>
                  )}
                </Stack>
                <MessageInput loading={sendMessageApiState.isLoading} onMessage={(message) => handleMessage(message, false)} />
              </Stack>
            )}
          </>
        )}
      </Stack>
    </>
  )
}
