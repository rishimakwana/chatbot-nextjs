import { TStyle } from '@/types'
import { MakeStyleProps } from './RootLayout.type'

export const makeStyle = ({ isDashboard }: MakeStyleProps): TStyle => {
  return {
    body: {
      flex: 1,
      width: { xs: 1, lg: 'calc(100% - var(--sidebar-width))' },
    },
    main: {
      flex: 1,
      mb: isDashboard ? 3 : undefined,
    },
  }
}
