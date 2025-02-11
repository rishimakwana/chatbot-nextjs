import Image from 'next/image'
import { useEffect, useState } from 'react'
import { IconButton, Stack, Typography } from '@mui/material'
import { RxCross2, RxEnterFullScreen } from 'react-icons/rx'

import folderIcon from '@/../public/icons/folder.svg'
import FileDetailPopup from '../fileDetailPopup/FileDetailPopup.componen'
import { PreviewProps } from './Preview.type'
import { getFileDetails } from './Preview.util'
import { style } from './Preview.style'

export default function Preview({ data, onRemove }: PreviewProps) {
  const [showDetailPopup, setShowDetailPopup] = useState(false)

  const fileDetails = getFileDetails(data)
  const { fileName, isFileInstance, isImage, fileSize, url } = fileDetails

  useEffect(() => {
    return () => {
      isFileInstance && URL.revokeObjectURL(url)
    }
  }, [])

  const fileDetailsAndActions = (
    <Stack direction="row" sx={style.fileDetails}>
      <Stack overflow="hidden">
        {/* Filename */}
        <Typography variant="body2" noWrap>
          {fileName}
        </Typography>

        {/* File Size */}
        {fileSize && (
          <Typography variant="body2" sx={style.fileSize}>
            {fileSize}
          </Typography>
        )}
      </Stack>

      <Stack direction="row">
        {/* Fullscreen */}
        {isImage && (
          <IconButton size="small" sx={style.tool} onClick={() => setShowDetailPopup(true)}>
            <RxEnterFullScreen className="icon-xs" />
          </IconButton>
        )}

        {/* Close */}
        <IconButton size="small" sx={style.tool} onClick={onRemove}>
          <RxCross2 className="icon-xs" />
        </IconButton>
      </Stack>
    </Stack>
  )

  return (
    <>
      <Stack sx={style.root}>
        {isImage ? (
          <Stack sx={style.imageContainer}>
            <Stack sx={style.metadata}>{fileDetailsAndActions}</Stack>
            <Stack component="img" src={url} alt={fileName} sx={style.image} />
          </Stack>
        ) : (
          <Stack direction="row" sx={style.fileContainer}>
            <Image src={folderIcon} alt="folder" />
            {fileDetailsAndActions}
          </Stack>
        )}
      </Stack>

      <FileDetailPopup {...fileDetails} open={showDetailPopup} onClose={() => setShowDetailPopup(false)} />
    </>
  )
}
