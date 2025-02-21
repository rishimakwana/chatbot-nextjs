export type RootLayoutProps = {
  title: string
} & (
  | {
      pageType: 'public'
      sidebar?: void
      header?: boolean
      footer?: boolean
    }
  | {
      pageType: 'auth'
      sidebar?: void
      header?: void
      footer?: boolean
    }
  | {
      pageType: 'protected'
      sidebar?: boolean
      header?: boolean
      footer?: boolean
    }
)

export type MakeStyleProps = {
  isDashboard: boolean
}
