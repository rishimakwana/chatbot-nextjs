import { TStyle } from '@/types'

export const style: TStyle = {
  root: {
    mb: 1,
    mx: 1,
    border: 1,
    borderColor: 'grey.200',
    borderRadius: 2,
    overflow: 'hidden',
    bgcolor: 'white',
    position: 'relative',
    boxShadow: '0 2px 5px -3px rgba(0,0,0,.1)',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  fileContainer: {
    p: 2,
    gap: 2,
  },
  fileDetails: {
    width: 1,
    gap: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  metadata: {
    '--background': 'rgb(255,255,255,.75)',
    p: '12px 16px 0',
    position: 'absolute',
    inset: '0 0 auto 0',
    bgcolor: 'var(--background)',
    ':after': {
      content: `''`,
      position: 'absolute',
      inset: '100% 0 auto',
      height: 1,
      background: 'linear-gradient(to top, transparent 0%, var(--background) 100%)',
      pointerEvents: 'none',
    },
  },
  fileSize: {
    color: 'text.disabled',
    fontSize: '80%',
  },
  tool: {
    width: 34,
    height: 34,
  },
  image: {
    maxHeight: 175,
    objectFit: 'contain',
    objectPosition: 'center',
  },
}
