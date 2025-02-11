import { Stack, Typography, useMediaQuery } from '@mui/material'

import UploadIcon from '@/components/_icon/UploadIcon.component'
import { style } from './Placeholder.style'
import { PlaceholderProps } from './Placeholder.type'

export default function Placeholder(props: PlaceholderProps) {
  let { heading, description, maxFiles } = props
  const isMdUp = useMediaQuery((theme) => theme.breakpoints.up('md'))

  if (typeof heading === 'object') {
    heading = isMdUp ? heading.desktop : heading.mobile
  }

  if (typeof description === 'object') {
    description = isMdUp ? description.desktop : description.mobile
  }

  return (
    <Stack sx={style.root}>
      {/* Icon */}
      <Stack sx={style.iconContainer}>
        <UploadIcon />
      </Stack>

      {/* Heading */}
      <Typography variant="h4" className="heading" sx={style.heading}>
        {heading || `Upload your file${maxFiles! > 1 ? 's' : ''}`}
      </Typography>

      {/* Description */}
      {description && <Typography>{description}</Typography>}
    </Stack>
  )
}
