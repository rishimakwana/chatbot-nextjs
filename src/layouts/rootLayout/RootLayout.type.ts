import { TRoles } from '@/types'

export type RootLayoutProps = {
  title: string
} & (
  | {
      pageType: 'public'
      sidebar?: void
      header?: boolean
      footer?: boolean
      roles?: void
    }
  | {
      pageType: 'auth'
      sidebar?: void
      header?: void
      footer?: boolean
      roles?: TRoles[]
    }
  | {
      pageType: 'protected'
      sidebar?: boolean
      header?: boolean
      footer?: boolean
      roles?: TRoles[]
    }
)

export type MakeStyleProps = {
  isDashboard: boolean
}
