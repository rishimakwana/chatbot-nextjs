import { useRouter } from 'next/router'
import { useState, useEffect, useCallback, useMemo } from 'react'
import { Avatar, Box, CircularProgress, Typography, IconButton, Stack, Container } from '@mui/material'
import { FiCopy, FiRefreshCcw, FiRefreshCw } from 'react-icons/fi'

import { useGetChatHistoryQuery } from '@/redux/api/chat.api'
import ChatInput from '../chatInput/ChatInput.component'
import { handleCopy } from '@/utils/download.utils'
import { Message } from '@/types/chat'
import Header from '@/components/header/Header.component'

export default function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([])
  const router = useRouter()
  const { id } = router.query

  const {
    data: chatHistory,
    isLoading,
    refetch,
    isUninitialized,
  } = useGetChatHistoryQuery(typeof id === 'string' ? id : '', { skip: !id })

  useEffect(() => {
    if (!id || isUninitialized) return
    refetch()
  }, [id, refetch, isUninitialized])

  const formattedMessages = useMemo(() => {
    if (!chatHistory) return []

    return chatHistory.map((item:any) => ({
      type: 'user' as const,
      content: item.query,
      timestamp: item.created_at,
    })).concat(
      chatHistory.map((item:any) => ({
        type: 'bot' as const,
        content: item.response,
        timestamp: item.created_at,
        files: item.file_name || '',
        temp_link: item.temp_link || '',
      }))
    )
  }, [chatHistory])

  useEffect(() => {
    setMessages((prev) => (JSON.stringify(prev) !== JSON.stringify(formattedMessages) ? formattedMessages : prev))
  }, [formattedMessages])

  const handleNewMessage = useCallback((message: Message) => {
    console.log(message)
    setMessages((prev) => [...prev, message])
  }, [])
  return (
    <>
      <Header />
      <Stack bgcolor={'background.paper'} sx={{ height: 'calc(100vh - 136px)', flexGrow:1, justifyContent: !id ? 'center' : 'flex-start' }}>
          {!id ? (
            <Stack alignItems={'center'} justifyContent={'center'} gap={2.5}>
              <Typography variant='display2'>What do you want to know?</Typography>
              <ChatInput onNewMessage={handleNewMessage} />
            </Stack>
          ) : (
            <>
              {isLoading ? (
                <CircularProgress sx={{ display: 'block', mx: 'auto', my: 4 }} />
              ) : (
                <Stack p={4} pb={0} gap={3} height={1}>
                  <Stack spacing={3} flexGrow={1} overflow={'auto'}>
                    {messages.map((message, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: 2,
                          p: 1,
                          flexDirection: message.type === 'user' ? 'row-reverse' : 'row',
                        }}
                      >
                        <Avatar sx={{ width: 36, height: 36, bgcolor: message.type === 'user' ? 'primary.light' : 'grey.300' }} />
                        <Stack flexDirection={'column'} alignItems={'flex-end'}> 
                        <Box sx={{ background: '#EBECF0', p: 1, borderRadius: 1 }}>
                          <Typography variant="body1" sx={{ wordBreak: 'break-word' }}>{message.content}</Typography>
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
                      </Box>
                    ))}
                    {/* {isLoading && <CircularProgress sx={{ display: 'block', mx: 'auto' }} />} */}
                  </Stack>
                  <ChatInput onNewMessage={handleNewMessage} />
                </Stack>
              )}
            </>
          )}
        </Stack>
    </>
  )
}
