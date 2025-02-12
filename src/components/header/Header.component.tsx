import { useForm } from 'react-hook-form'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { AiOutlineUpload } from 'react-icons/ai'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUploadPdfMutation } from '@/redux/api/common.api'
import { schema, TSchema } from './Header.config'
import { style } from './Header.style'
import Image from 'next/image'
import pdfImage from '@/../public/images/pages/pdf.png'
import seeAllDoc from '@/../public/images/pages/seealldocs.svg'
import { useGetAllDocumentsQuery } from '@/redux/api/documents.api'
import { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import Link from 'next/link'
import VisuallyHiddenInput from '../hiddenInput/HiddenInput.component'

export default function Header() {
  const [uploadPdf, { isLoading }] = useUploadPdfMutation()
  const [skip, setSkip] = useState(1)
  const limit = 5

  const { setValue } = useForm<TSchema>({
    resolver: yupResolver(schema),
    defaultValues: {
      file: '',
    },
  })

  const { data, isLoading: docsLoading, isError, isSuccess } = useGetAllDocumentsQuery({ skip, limit })
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
      <Box display="flex" alignItems="center" gap={2}>
        {data && data.list.length > 0 && (
          <>
            {data.list.map((file: any, index: number) => (
              <Stack key={index} sx={style.docCard}>
                <Image src={pdfImage} alt="pdf" width={18} height={20} />
                <Typography variant="body2" color='primary.main' sx={style.docCardText}>{file.file_name}</Typography>
              </Stack>
            ))}
            {/* Upload Button as a Card */}
            <Stack sx={{...style.docCard, cursor: 'pointer'}}>
              <CiCirclePlus size={28} />
              <VisuallyHiddenInput onChange={handleFileChangeAndSubmit} />
              <Typography variant="body2" color='primary.main' fontSize={11}>Upload File</Typography>
            </Stack>
          </>
        )}
      </Box>
      <Box>
        {data && data.list && data.list.length > 0 ? (
          <Link href="/documents">
            <Image src={seeAllDoc} alt="pdf" width={40} height={40} style={{ cursor: 'pointer' }} />
          </Link>
        ) : (
          <Button component="label" variant="contained" disabled={isLoading} startIcon={<AiOutlineUpload />}>
            Upload files
            <VisuallyHiddenInput onChange={handleFileChangeAndSubmit} />
          </Button>
        )}
      </Box>
    </Stack>
  )
}
