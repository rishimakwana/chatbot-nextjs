import { IconType } from 'react-icons'
import { FabProps } from '@mui/material'
import { TPaginationApiParams } from '@/types'

export type TAction = {
  label: string
  Icon: IconType
  color: FabProps['color']
  onClick: (id: number) => void
  disable?: boolean
}

export type TFilter = TPaginationApiParams & {
  searchVal: string
}