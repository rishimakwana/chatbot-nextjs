import { useRouter } from 'next/router'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Avatar, Box, CircularProgress, Typography, IconButton, Stack, Container, Skeleton } from '@mui/material'
import { FiCopy, FiRefreshCcw, FiRefreshCw } from 'react-icons/fi'

import { useGetChatHistoryQuery, useSendMessageMutation } from '@/redux/api/chat.api'
import ChatInput from '../chatInput/ChatInput.component'
import { handleCopy } from '@/utils/download.utils'
import { Message } from '@/types/chat'
import Header from '@/components/header/Header.component'
import Image from 'next/image'
import { style } from './ChatScreen.style'
import { useReduxDispatch, useReduxSelector } from '@/hooks'
import { addMessage, setMessages } from '@/redux/slice/chat.slice'

export default function ChatScreen() {
  const messages = useReduxSelector((state) => state.chat.messages)
  const [isChatLoading, setIsChatLoading] = useState(false)
  const [sendMessage] = useSendMessageMutation()

  const dispatch = useReduxDispatch()
  const router = useRouter()
  const { id } = router.query

  const {
    data: chatHistory,
    isLoading,
    refetch,
    isUninitialized,
    isSuccess,
  } = useGetChatHistoryQuery(typeof id === 'string' ? id : '', {
    skip: !id || router.query.isNewChat === 'true',
  })

  const fetchChatResponse = async () => {
    if (!router.query.isNewChat || !messages[0]?.content) return

    try {
      setIsChatLoading(true)
      const response = await sendMessage({
        session_id: router.query.id as string,
        query: messages[0].content,
        isFirstChat: true,
      }).unwrap()

      dispatch(
        addMessage({
          type: 'user',
          content: messages[0].content,
          files: messages[0].files,
          temp_link: messages[0].temp_link,
        }),
      )

      dispatch(
        addMessage({
          type: 'bot',
          content: response.answer,
          files: response.file_name,
          temp_link: response.temp_link,
        }),
      )
    } finally {
      setIsChatLoading(false)
      router.replace({ query: { ...router.query, isNewChat: undefined } }, undefined, { shallow: true })
    }
  }

  useEffect(() => {
    fetchChatResponse()
  }, [])

  // useEffect(() => {
  //   if (!id || isUninitialized) return
  //   refetch()
  // }, [id, refetch, isUninitialized])

  const formattedMessages = useMemo(() => {
    if (!chatHistory) return []

    return chatHistory
      .map((item: any) => ({
        type: 'user' as const,
        content: item.query,
        timestamp: item.created_at,
      }))
      .concat(
        chatHistory.map((item: any) => ({
          type: 'bot' as const,
          content: item.response,
          timestamp: item.created_at,
          files: item.file_name || '',
          temp_link: item.temp_link || '',
        })),
      )
  }, [chatHistory])

  useEffect(() => {
    dispatch(setMessages(formattedMessages))
  }, [formattedMessages])

  const handleNewMessage = useCallback((message: Message) => {
    console.log(message)
    dispatch(addMessage(message))
  }, [])

  return (
    <>
      <Header />
      <Stack bgcolor={'background.paper'} sx={{ height: 'calc(100vh - 137px)', flexGrow: 1, justifyContent: !id ? 'center' : 'flex-start' }}>
        {!id ? (
          <Stack alignItems={'center'} justifyContent={'center'} gap={2.5}>
            <Typography variant="display2">What do you want to know?</Typography>
            <ChatInput onNewMessage={handleNewMessage} setIsChatLoading={setIsChatLoading} />
          </Stack>
        ) : (
          <>
            {isLoading ? (
              <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
            ) : (
              <Stack p={4} pt={0} pb={0} gap={3} height={1}>
                <Stack spacing={3} flexGrow={1} overflow={'auto'}>
                  {messages.map((message, index) => (
                    <Stack key={index} gap={2} p={1} alignItems={'flex-start'} direction={message.type === 'user' ? 'row-reverse' : 'row'}>
                      {message.type === 'bot' && (
                        <Stack sx={style.bot_avatar}>
                          <Image src={'/images/non_lablel_ogo.svg'} alt="bot-avatar" width={24} height={24} />
                        </Stack>
                      )}
                      {message.type === 'user' && <Avatar sx={{ width: 40, height: 40, bgcolor: message.type === 'user' ? 'primary.light' : 'grey.300' }} />}
                      {/* <Avatar sx={{ width: 36, height: 36, bgcolor: message.type === 'user' ? 'primary.light' : 'grey.300' }} /> */}
                      <Stack flexDirection={'column'} alignItems={'flex-end'}>
                        <Box sx={{ background: message.type === 'user' ? 'primary.light' : '#EBECF0', p: 2, borderRadius: 2, border: message.type === 'user' ? '1px solid #E0E0E0' : '1px solid #EBECF0' }}>
                          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>
                            {message.content}
                          </Typography>
                        </Box>
                        {message.type !== 'user' && (
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
                  {isChatLoading && (
                    <Stack direction={'row'} alignItems={'center'} gap={2} p={1}>
                      <Stack sx={style.bot_avatar}>
                        <Image src={'/images/non_lablel_ogo.svg'} alt="bot-avatar" width={24} height={24} />
                      </Stack>
                      <Skeleton variant="text" animation="wave" width={210} height={60} />
                    </Stack>
                  )}
                </Stack>
                <ChatInput onNewMessage={handleNewMessage} setIsChatLoading={setIsChatLoading} />
              </Stack>
            )}
          </>
        )}
      </Stack>
    </>
  )
}
