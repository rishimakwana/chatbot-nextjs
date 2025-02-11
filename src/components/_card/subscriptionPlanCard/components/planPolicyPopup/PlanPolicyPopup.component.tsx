import { Dialog, DialogContent, DialogTitle, Typography, Link as MuiLink } from '@mui/material'

import DialogClose from '@/components/dialogClose/DialogClose.component'
import { PlanPolicyPopupProps } from './PlanPolicyPopup.type'

export default function PlanPolicyPopup({ onClose }: PlanPolicyPopupProps) {
  return (
    <Dialog open onClose={onClose}>
      {/* Header */}
      <DialogTitle>
        Plan Policy
        <DialogClose onClick={onClose} />
      </DialogTitle>

      {/* Content */}
      <DialogContent dividers>
        <Typography>
          By checking this box, you acknowledge that you have read and understood the SafeDox{' '}
          <MuiLink href="https://www.safedox.com/terms-and-conditions" target="_blank" sx={{ fontWeight: 'inherit' }}>
            Terms and Conditions
          </MuiLink>{' '}
          and you consent to the use and storage of your personal information that you have shared with SafeDox as set forth in your subscription agreement with SafeDox.
        </Typography>
      </DialogContent>
    </Dialog>
  )
}
