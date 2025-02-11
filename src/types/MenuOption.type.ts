import { TRoles } from './Roles.type'
import { IconType } from 'react-icons'

// prettier-ignore
export type TMenuOption = {
  label: string,
  Icon?: IconType,
  roles?: TRoles[],
  exludedRoles?: TRoles[]
  onClick?: () => void
} & (
    | { link?: never, subMenu: Omit<TMenuOption, 'Icon'>[], target?: never }
    | { link: string, subMenu?: never, target?: '_blank' | '_self' }
  ) & (
    | { roles?: TRoles[], exludedRoles?: never }
    | { roles?: never, exludedRoles?: TRoles[] }
  )
