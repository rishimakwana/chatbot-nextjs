import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { FaCircleArrowUp } from 'react-icons/fa6'
import { IoChatbubbleEllipses, IoCreateOutline, IoHelpCircle, IoStatsChart, IoDocumentTextOutline } from 'react-icons/io5'
import { useAddSessionMutation, useSendMessageMutation } from '@/redux/api/chat.api'
import { Box, Button, IconButton, Stack, TextField } from '@mui/material'
import { Message } from '@/types/chat'
import { style } from './ChatInput.style'

interface ChatInputProps {
  onNewMessage: (message: Message) => void
  setIsChatLoading: (state: boolean) => void
}

export default function ChatInput({ onNewMessage, setIsChatLoading }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const router = useRouter()
  const [currentSessionId, setCurrentSessionId] = useState<string | undefined>(undefined)
  const [sendMessage] = useSendMessageMutation()
  const [addSession] = useAddSessionMutation()
  const isNewChat = router.pathname === '/'

  useEffect(() => {
    if (router.query.id) {
      setCurrentSessionId(router.query.id as string)
    }
  }, [router.query])

  const handleSendMessage = async () => {
    setIsChatLoading(true)
    const trimmedMessage = message.trim()
    if (!trimmedMessage) return

    onNewMessage({ type: 'user', content: trimmedMessage })
    setMessage('')

    try {
      const sessionId = currentSessionId || (await addSession().unwrap()).sessionId
      if (!currentSessionId) setCurrentSessionId(sessionId)

      if (isNewChat) {
        router.push(`/chat/${sessionId}?isNewChat=true`, undefined, { shallow: true })
      } else {
        const response = await sendMessage({ session_id: sessionId, query: trimmedMessage, isFirstChat: !currentSessionId }).unwrap()
        console.log('response', response)
        onNewMessage({ type: 'bot', content: response.answer, files: response.file_name, temp_link: response.temp_link })
      }
    } catch (error) {
      console.error('Failed to send message:', error)
    } finally {
      setIsChatLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const renderActionButtons = () => (
    <Stack gap={1} sx={style.actionButtons}>
      {[
        { icon: <IoStatsChart size={18} />, text: 'Analyze data' },
        { icon: <IoChatbubbleEllipses size={18} />, text: 'Start Chat' },
        { icon: <IoHelpCircle size={18} />, text: 'Start Q&A' },
        { icon: <IoCreateOutline size={18} />, text: 'Help me write' },
      ].map(({ icon, text }, index) => (
        <Button key={index} variant="transparent" startIcon={icon}>
          {text}
        </Button>
      ))}
    </Stack>
  )
  const hasInput = message.trim().length > 0

  return (
    <Stack gap={2} width={isNewChat ? '80%' : '100%'}>
      <Stack alignItems={'center'}>
        <TextField
          fullWidth
          multiline={isNewChat}
          rows={isNewChat ? 3 : 1}
          placeholder={isNewChat ? 'Ask anything...' : 'Reply to docbot'}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              sx: { borderRadius: 2, padding: 0, bgcolor: isNewChat ? '#F8FAFC' : 'background.paper' },
              endAdornment: hasInput && (
                <IconButton color="primary" onClick={handleSendMessage} disabled={!message.trim()}>
                  <FaCircleArrowUp size={32} />
                </IconButton>
              ),
            },
          }}
        />
      </Stack>

      {isNewChat && renderActionButtons()}
    </Stack>
  )
}
