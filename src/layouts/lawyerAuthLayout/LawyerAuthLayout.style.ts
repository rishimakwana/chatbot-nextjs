import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    position: 'relative',
    width: 1,
    bgcolor: 'background.paper',
    zIndex: 1,
    '--spacing': '12px',
  },
  contentBox: {
    py: { xs: 5, md: 7.5 },
    gap: { xs: 6.5, md: 7.5 },
    minHeight: 1,
    maxWidth: 468,
    mx: 'auto',
    pr: { md: 'var(--spacing)' },
  },
  childrenBox: {
    justifyContent: 'center',
    flex: 1,
  },
  imageBox: {
    display: { xs: 'none', md: 'flex' },
    width: 'calc(50% - var(--spacing))',
    bgcolor: 'divider',
    position: 'absolute',
    inset: '0 0 0 auto',
  },
  imageBoxContent: {
    width: 1,
    position: 'sticky',
    top: 0,
  },
}
