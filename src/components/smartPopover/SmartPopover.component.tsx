import { useRef, useState } from 'react'
import { SmartPopoverContext, useSmartPopoverContext } from './SmartPopover.context'
import { SmartPopoverContentProps, SmartPopoverProps, SmartPopoverToggleProps } from './SmartPopover.type'
import { Popover, Stack } from '@mui/material'

function SmartPopover({ children }: SmartPopoverProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)

  return (
    <SmartPopoverContext.Provider value={{ open, setOpen, anchorEl: rootRef }}>
      <Stack ref={rootRef}>{children}</Stack>
    </SmartPopoverContext.Provider>
  )
}

function SmartPopoverToggle({ children }: SmartPopoverToggleProps) {
  const { setOpen } = useSmartPopoverContext()

  return <Stack onClick={() => setOpen((v) => !v)}>{children}</Stack>
}

function SmartPopoverContent(props: SmartPopoverContentProps) {
  const { children, anchorOrigin = { vertical: 'bottom', horizontal: 'left' }, ...restProps } = props
  const { open, setOpen, anchorEl } = useSmartPopoverContext()

  return (
    <Popover {...restProps} open={open} anchorEl={anchorEl.current} onClose={() => setOpen(false)} anchorOrigin={anchorOrigin}>
      {children}
    </Popover>
  )
}

SmartPopover.Toggle = SmartPopoverToggle
SmartPopover.Content = SmartPopoverContent
export default SmartPopover
