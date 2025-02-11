import { MdOutlineImage } from 'react-icons/md'
import { Avatar, Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material'

import DialogClose from '@/components/dialogClose/DialogClose.component'
import DialogTransition from '@/components/dialogTransition/DialogTransition.component'
import { FileDetailPopupProps } from './FileDetailPopup.type'
import { style } from './FileDetailPopup.style'

export default function FileDetailPopup(props: FileDetailPopupProps) {
  const { fileName, fileSize, onClose, url, open } = props

  return (
    <Dialog open={open} onClose={onClose} fullScreen TransitionComponent={DialogTransition}>
      <DialogTitle sx={style.dialogTitle}>
        {/* Icon */}
        <Avatar>
          <MdOutlineImage className="icon-xl" />
        </Avatar>

        <Stack gap={0.5}>
          {/* Name */}
          <Typography color="text.primary" fontWeight={600}>
            {fileName}
          </Typography>

          {/* Size */}
          <Typography variant="body2" color="text.disabled">
            {fileSize}
          </Typography>
        </Stack>

        {/* Close */}
        <DialogClose onClick={onClose} variant="relative" />
      </DialogTitle>

      {/* File */}
      <DialogContent sx={style.dialogContent}>
        <Box component="img" src={url} sx={style.image} />
      </DialogContent>
    </Dialog>
  )
}
