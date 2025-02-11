import { PopoverProps } from '@mui/material'
import { Dispatch, PropsWithChildren, RefObject, SetStateAction } from 'react'

export type SmartPopoverProps = PropsWithChildren & {}

export type SmartPopoverToggleProps = PropsWithChildren & {}

export type SmartPopoverContentProps = Omit<PopoverProps, 'open' | 'onClose' | 'anchorEl'>

export type TSmartPopoverContext = {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  anchorEl: RefObject<HTMLDivElement | null>
}
