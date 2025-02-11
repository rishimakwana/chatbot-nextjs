import { TMenuOption } from '@/types'
import { useReduxSelector } from './redux.hook'

export const useFilterMenu = (menus: TMenuOption[]): TMenuOption[] => {
  const { role } = useReduxSelector((state) => state.user)

  const filterMenu = () => {
    return menus.filter((item) => {
      if (item.roles && !item.roles.includes(role)) return false
      if (item.exludedRoles && item.exludedRoles.includes(role)) return false
      return true
    })
  }

  return filterMenu()
}
