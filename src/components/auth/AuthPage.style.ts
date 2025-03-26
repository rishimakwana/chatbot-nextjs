import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    height: '100vh',
    p: 2,
    position: 'relative',
    width: 1,
    bgcolor: 'background.paper',
    zIndex: 1,
    '--spacing': '1px',
    // justifyContent: 'center', // Center vertically
    // alignItems: 'center',
  },
  contentBox: {
    py: { xs: 0.5, md: 1 },
    gap: { xs: 1.5, md: 2.5 },
    minHeight: 1,
    // maxWidth: '362px',
    width: { xs: 1, md: '50%' },
    pr: { md: 'var(--spacing)' },
  },
  childrenBox: {
    justifyContent: 'center',
    flex: 1,
  },
  imageBox: {
    display: { xs: 'none', md: 'flex' },
    width: 'calc(50% - var(--spacing))',
    // bgcolor: 'divider',
    bgcolor: 'background.paper',
    position: 'absolute',
    inset: '0 0 0 auto',
  },
  imageBoxContent: {
    width: 1,
    position: 'sticky',
    top: 0,
  },
}
