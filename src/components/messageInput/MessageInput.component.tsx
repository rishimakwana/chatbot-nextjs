import { useState } from 'react'
import { useRouter } from 'next/router'
import { FaCircleArrowUp } from 'react-icons/fa6'
import { Button, IconButton, Stack, TextField } from '@mui/material'
import { PiChartLineThin } from 'react-icons/pi'
import { LuFileScan } from 'react-icons/lu'
import { BsFiletypeXlsx } from 'react-icons/bs'
import { GoPencil } from 'react-icons/go'

import { style } from './MessageInput.style'
import { MessageInputProps } from './MessageInput.type'

export default function MessageInput(props: MessageInputProps) {
  const { loading, onMessage } = props
  const [message, setMessage] = useState('')

  const router = useRouter()
  const isNewChat = router.pathname === '/'

  const renderActionButtons = () => (
    <Stack gap={1} sx={style.actionButtons}>
      {[
        { icon: <PiChartLineThin size={18} />, text: 'Analyze data' },
        { icon: <LuFileScan size={18} />, text: 'Scan .Doc' },
        { icon: <BsFiletypeXlsx size={18} />, text: 'Scan .XLSX file' },
        { icon: <GoPencil size={18} />, text: 'Help me write' },
      ].map(({ icon, text }, index) => (
        <Button key={index} variant="outlined" startIcon={icon}>
          {text}
        </Button>
      ))}
    </Stack>
  )
  const hasInput = message.trim().length > 0

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setMessage('')
    await onMessage(message)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <Stack gap={2} width={isNewChat ? '80%' : '100%'}>
      <Stack alignItems={'center'}>
        <TextField
          fullWidth
          multiline={isNewChat}
          rows={isNewChat ? 3 : 1}
          placeholder={isNewChat ? 'Ask anything...' : 'Reply to docbot'}
          value={message}
          disabled={loading}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          slotProps={{
            input: {
              sx: { borderRadius: 2, padding: 0, bgcolor: isNewChat ? '#F8FAFC' : 'background.paper', color: 'primary.main' },
              endAdornment: hasInput && (
                <IconButton color="primary" onClick={handleSubmit} disabled={!message.trim() || loading}>
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
