import { useRouter } from 'next/router'
import { GoPencil } from 'react-icons/go'
import { LuFileScan } from 'react-icons/lu'
import { useDropzone } from 'react-dropzone'
import { BsFiletypeXlsx } from 'react-icons/bs'
import { PiChartLineThin } from 'react-icons/pi'
import { FaCircleArrowUp } from 'react-icons/fa6'
import { useEffect, useRef, useState } from 'react'
import { Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { style } from './MessageInput.style'
import { MessageInputProps } from './MessageInput.type'
import { useUploadPdfMutation } from '@/redux/api/documents.api'
import { MdClose } from 'react-icons/md'
import { useReduxSelector } from '@/hooks'

export default function MessageInput(props: MessageInputProps) {
  const { loading, onMessage, onSummarize } = props
  const [message, setMessage] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const { isSummarizeLoading } = useReduxSelector((state) => state.session)

  const [uploadPdf, { isLoading }] = useUploadPdfMutation()
  const [fileData, setFileData] = useState<{ type: string; time: number } | null>(null)

  const suggestions = ['How can I save money effectively?', 'What are the best ways to stay productive?', 'How do I improve my communication skills?']

  const actionButtons = [
    { icon: <PiChartLineThin size={18} />, text: 'Summarise', onClick: () => onSummarize && onSummarize() },
    { icon: <LuFileScan size={18} />, text: 'Upload Doc', onClick: () => handleFileUpload('doc') },
    { icon: <BsFiletypeXlsx size={18} />, text: 'Upload XLSX', onClick: () => handleFileUpload('xlsx') },
    { icon: <GoPencil size={18} />, text: 'Help me write', onClick: () => setShowSuggestions(!showSuggestions) },
  ]

  const router = useRouter()
  const isNewChat = router.pathname === '/'

  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'application/pdf': ['.pdf', '.doc', '.docx', '.xlsx'] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0])
    },
  })

  const handleFileUpload = (type: string) => {
    setFileData({ type, time: Date.now() })
  }

  useEffect(() => {
    if (fileData) {
      triggerFileInput()
    }
  }, [fileData])

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const handleFileChangeAndSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        await uploadPdf(file).unwrap()
      } catch (error) {
        console.error('Error uploading file:', error)
      }
      console.log('File selected:', file)
    }
  }

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

      {/* Action Buttons */}
      {isNewChat && !showSuggestions && (
        <Stack gap={1} sx={style.actionButtons}>
          {actionButtons.map(({ icon, text, onClick }, index) => (
            <Button key={index} variant="outlined" startIcon={icon} onClick={onClick} loading={text === 'Summarise' && isSummarizeLoading}>
              {text}
            </Button>
          ))}
        </Stack>
      )}

      {/* Suggestions */}
      {showSuggestions && (
        <Stack direction={'row'} justifyContent={'space-between'} sx={style.suggestionStack}>
          <Stack>
            {suggestions.map((suggestion, index) => (
              <Typography key={index} onClick={() => setMessage(suggestion)} sx={style.suggestion}>
                {suggestion}
              </Typography>
            ))}
          </Stack>
          <IconButton onClick={() => setShowSuggestions(false)}>
            <MdClose size={20} />
          </IconButton>
        </Stack>
      )}

      <input type="file" accept={fileData?.type === 'doc' ? '.doc,.docx' : '.xlsx'} hidden ref={fileInputRef} onChange={handleFileChangeAndSubmit} />
    </Stack>
  )
}
