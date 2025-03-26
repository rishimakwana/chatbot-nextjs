import { TStyle } from '@/types'

export const style: TStyle = {
  actionButtons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    width: '100%',
    flexWrap: 'wrap',
  },

  suggestionStack: {
    mt: 1,
    p: 1,
    borderRadius: 2,
    textAlign: 'left',
  },
  suggestion: {
    cursor: 'pointer',
    transition: 'background-color 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: '#E2E8F0',
    },
  }
}
