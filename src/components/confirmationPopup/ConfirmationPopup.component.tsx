import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material'

import { ConfirmationPopupProps } from './ConfirmationPopup.type'

export default function ConfirmationPopup(props: ConfirmationPopupProps) {
  const { heading, subheading, loading, acceptButtonText, cancelButtonText, onAccept, onCancel } = props

  return (
    <Dialog open fullWidth onClose={() => !loading && onCancel()}>
      <DialogTitle>{heading}</DialogTitle>
      <DialogContent>
        <Typography variant="h2" color="text.secondary" fontWeight={500}>
          {subheading}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ color: 'text.secondary' }}>
        <Button variant="outlined" color="inherit" disabled={loading} onClick={onCancel}>
          {cancelButtonText || 'Cancel'}
        </Button>
        <Button variant="orange" loading={loading} onClick={onAccept}>
          {acceptButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
