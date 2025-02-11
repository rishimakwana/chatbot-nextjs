import { Stack, Typography } from '@mui/material'

import noDataIcon from '@/../public/icons/no-data.svg'
import { NoRowProps } from './NoRow.type'
import { style } from './NoRow.style'

export default function NoRow(props: NoRowProps) {
  const { image, title, subtitle, actions, size = 200 } = props

  return (
    <Stack sx={style.root}>
      {/* Icon */}
      <img src={image || noDataIcon.src} alt="icon" width={size} height={size} />

      <Stack gap={1}>
        {/* Title */}
        <Typography variant="h2" fontWeight={600}>
          {title || 'NO RECORD FOUND'}
        </Typography>

        {/* Subtitle */}
        {subtitle && <Typography sx={style.subtitle}>{subtitle}</Typography>}
      </Stack>

      {/* Actions */}
      {actions}
    </Stack>
  )
}
