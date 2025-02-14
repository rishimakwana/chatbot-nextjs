import { IconType } from 'react-icons'
import { FabProps, SxProps } from '@mui/material'

export type TAction = {
  label: string
  Icon: IconType
  color: FabProps['color']
  onClick: (id: number) => void
  disable?: boolean
}
