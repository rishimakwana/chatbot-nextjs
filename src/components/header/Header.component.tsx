import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { CiCirclePlus } from 'react-icons/ci'
import { AiOutlineUpload } from 'react-icons/ai'
import { yupResolver } from '@hookform/resolvers/yup'
import { GoSidebarCollapse, GoUpload } from 'react-icons/go'
import { Box, Button, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import Image from 'next/image'
import pdfImage from '@/../public/images/pages/pdf.png'
import seeAllDoc from '@/../public/images/pages/seealldocs.svg'
import VisuallyHiddenInput from '../hiddenInput/HiddenInput.component'
import { useState } from 'react'
import { style } from './Header.style'
import { useReduxDispatch } from '@/hooks'
import { schema, TSchema } from './Header.config'
import { useGetAllDocumentsQuery, useUploadPdfMutation } from '@/redux/api/documents.api'
import Logo from '../logo/Logo.component'
import { setSidebarDrawer } from '@/redux/slice/layout.slice'

export default function Header() {
  const [uploadPdf, { isLoading }] = useUploadPdfMutation()
  const [page, setPage] = useState(1)
  const limit = 5

  const dispatch = useReduxDispatch()
  const isLgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'))

  const { setValue } = useForm<TSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      file: '',
    },
  })

  const { data } = useGetAllDocumentsQuery({ page, limit })
  const handleFileChangeAndSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      try {
        setValue('file', file)
        const response = await uploadPdf(file).unwrap()
        const imageUrl = response.image
        setValue('file', imageUrl)
      } catch (error) {
        console.error('Error uploading file:', error)
      }
    }
  }

  return (
    <Stack component="section" sx={style.root}>
      {/* Menu */}
      {isLgDown && (
        <Stack direction="row">
          <IconButton size="large" edge="start" onClick={() => dispatch(setSidebarDrawer(true))}>
            <GoSidebarCollapse className="icon-xxl" />
          </IconButton>
        </Stack>
      )}

      {/* Logo */}
      {isLgDown && (
        <Stack alignItems="center">
          <Logo collapsed={true} />
        </Stack>
      )}

      {!isLgDown && (
        <Box display="flex" alignItems="center" gap={2}>
          {data && data.list.length > 0 && (
            <>
              {data.list.map((file: any, index: number) => (
                <Stack key={index} sx={style.docCard}>
                  <Image src={pdfImage} alt="pdf" width={18} height={20} />
                  <Typography variant="body2" color="primary.main" sx={style.docCardText}>
                    {file.file_name}
                  </Typography>
                </Stack>
              ))}
              {/* Upload Button as a Card */}
              <Stack sx={{ ...style.docCard, cursor: 'pointer' }}>
                <CiCirclePlus size={28} />
                <VisuallyHiddenInput onChange={handleFileChangeAndSubmit} />
                <Typography variant="body2" color="primary.main" fontSize={11}>
                  Upload File
                </Typography>
              </Stack>
            </>
          )}
        </Box>
      )}

      <Box>
        {data && data.list && data.list.length > 0 ? (
          <Link href="/documents">
            <Image src={seeAllDoc} alt="pdf" width={40} height={40} style={{ cursor: 'pointer' }} />
          </Link>
        ) : !isLgDown ? (
          <Button component="label" variant="orange" disabled={isLoading} startIcon={<AiOutlineUpload />}>
            Upload files
            <VisuallyHiddenInput onChange={handleFileChangeAndSubmit} />
          </Button>
        ) : (
          <Button component="label" variant="outlined" disabled={isLoading}>
            <GoUpload />
            <VisuallyHiddenInput onChange={handleFileChangeAndSubmit} />
          </Button>
        )}
      </Box>
    </Stack>
  )
}
