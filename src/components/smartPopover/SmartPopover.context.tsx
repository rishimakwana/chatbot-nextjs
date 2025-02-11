import { createContext, useContext } from 'react'
import { TSmartPopoverContext } from './SmartPopover.type'

export const SmartPopoverContext = createContext<TSmartPopoverContext | undefined>(undefined)

export const useSmartPopoverContext = () => {
  const context = useContext(SmartPopoverContext)

  if (!context) throw new Error('useSmartPopoverContext hook must be used within SmartPopover component.')

  return context
}
