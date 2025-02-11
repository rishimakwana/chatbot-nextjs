import { Stack, Tooltip } from '@mui/material'
import { NotEditableTooltipProps } from './NotEditableTooltip.type'

export default function NotEditableTooltip({ children, title = 'Not Editable', show = true }: NotEditableTooltipProps) {
  return (
    <Tooltip title={show ? title : ''}>
      <Stack>{children}</Stack>
    </Tooltip>
  )
}
