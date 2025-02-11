import { LoadingButton } from '@mui/lab'
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Typography } from '@mui/material'

import { ConfirmationPopupProps } from './ConfirmationPopup.type'

export default function ConfirmationPopup(props: ConfirmationPopupProps) {
  const { heading, subheading, loading, acceptButtonText, cancelButtonText, onAccept, onCancel } = props

  return (
    <Dialog open fullWidth onClose={() => !loading && onCancel()}>
      <DialogTitle>{heading}</DialogTitle>
      <DialogContent>
        <Typography variant="h4">{subheading}</Typography>
      </DialogContent>
      <DialogActions sx={{ color: 'text.secondary' }}>
        <Grid2 container width={1} justifyContent="end">
          <Grid2 size={{ xs: 6, sm: 'auto' }}>
            <LoadingButton variant="outlined" color="inherit" fullWidth disabled={loading} onClick={onCancel}>
              {cancelButtonText || 'Cancel'}
            </LoadingButton>
          </Grid2>
          <Grid2 size={{ xs: 6, sm: 'auto' }}>
            <LoadingButton variant="gradient" fullWidth loading={loading} onClick={onAccept}>
              {acceptButtonText}
            </LoadingButton>
          </Grid2>
        </Grid2>
      </DialogActions>
    </Dialog>
  )
}
