import { useForm } from 'react-hook-form'
import { Box, Button, Card, CardContent, Container, IconButton, Stack, Typography } from '@mui/material'
import { AiOutlineUpload } from 'react-icons/ai'
import { styled } from '@mui/material/styles'
import { yupResolver } from '@hookform/resolvers/yup'
import { useUploadPdfMutation } from '@/redux/api/common.api'
import { schema, TSchema } from './Header.config'
import { style } from './Header.style'
import Image from 'next/image'
import pdfImage from '@/../public/images/pages/pdfimage.svg'
import seeAllDoc from '@/../public/images/pages/seealldocs.svg'
import { useGetAllDocumentsQuery } from '@/redux/api/documents.api'
import { useState } from 'react'
import { CiCirclePlus } from 'react-icons/ci'
import Link from 'next/link'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

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
              <Card key={index} sx={style.docCard}>
                <CardContent>
                  <Image src={pdfImage} alt="pdf" width={40} height={40} />
                  <Typography variant="body2" sx={style.docCardText}>
                    {file.file_name}
                  </Typography>
                </CardContent>
              </Card>
            ))}
            <Card sx={style.docCard}>
              <CardContent>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Box width={40} height={40}>
                    <CiCirclePlus size={28} />
                  </Box>
                  <VisuallyHiddenInput type="file" onChange={handleFileChangeAndSubmit} />
                  <Typography variant="body2" sx={style.docCardText}>
                    Upload File
                  </Typography>
                </Box>
              </CardContent>
            </Card>
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
            <VisuallyHiddenInput type="file" onChange={handleFileChangeAndSubmit} />
          </Button>
        )}
      </Box>
    </Stack>
  )
}
