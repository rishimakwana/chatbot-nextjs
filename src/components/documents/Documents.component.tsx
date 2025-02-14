import Link from 'next/link'
import Image from 'next/image'
import { useCallback } from 'react'
import { useRouter } from 'next/router'
import { IoSearch } from 'react-icons/io5'
import { GoArrowLeft } from 'react-icons/go'
import { Box, Grid2, IconButton, Pagination, Paper, Stack, TextField, Typography } from '@mui/material'

import { usePagination } from '@/hooks'
import { useGetAllDocumentsQuery } from '@/redux/api/documents.api'
import { MdCancel } from 'react-icons/md'
import pdfImage from '@/../public/images/pages/pdf.png'
import RenderContent from '../renderContent/RenderContent.component'

export default function Documents() {
  const router = useRouter()
  const { paginationModel, setPaginationModel, skip, limit, pageSize } = usePagination()
  const { data, isLoading, isError, isSuccess } = useGetAllDocumentsQuery({ skip, limit })

  const handlePageChange = useCallback(
    (event: any, newPage: number) => {
      setPaginationModel({ page: newPage - 1, pageSize })
    },
    [pageSize, setPaginationModel],
  )

  const handleSearch = useCallback(
    (value: any) => {
      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, search: value, page: 1 },
        },
        undefined,
        { shallow: true },
      )
    },
    [router],
  )

  return (
    <>
      <Stack direction={'row'} justifyContent={'space-between'} px={4} py={2} sx={{ bgcolor: 'background.paper' }} alignItems={'center'}>
        {/* Back to chat */}
        <Stack direction={'row'} justifyContent={'center'} gap={1}>
          <Link href={'/'}>
            <GoArrowLeft />
          </Link>
          <Typography variant="body2" color="text.primary" sx={{ fontWeight: 500, cursor: 'pointer', fontSize: '20px' }}>
            Back to chat
          </Typography>
        </Stack>

        {/* Search Bar */}
        <TextField
          placeholder="Search File"
          size="small"
          // onChange={(e) => searchDebounce({ key: 'searchVal', value: e.target.value })}
          slotProps={{ input: { startAdornment: <IoSearch style={{ flexShrink: 0 }} /> } }}
          sx={{ width: { xs: 1, sm: 'unset' } }}
        />
      </Stack>
      <Stack bgcolor={'background.paper'}>
        <RenderContent loading={isLoading} error={isError}>
          {data && (
            <>
              <Box component="div" px={4} py={2}>
                <Grid2 container spacing={2}>
                  {data?.list.map((doc, index) => (
                    <Grid2 key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                      <Paper
                        sx={{
                          p: 2,
                          display: 'flex',
                          alignItems: 'center',
                          gap: 1,
                        }}
                      >
                        <Image src={pdfImage} alt="pdf" width={40} height={40} />
                        <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                          <Typography variant="body1">doc.name</Typography>
                          <Typography variant="body1">file.date • file.size</Typography>
                        </Box>
                        <IconButton size="small">
                          <MdCancel size={16} />
                        </IconButton>
                      </Paper>
                    </Grid2>
                  ))}
                </Grid2>
              </Box>
              {!isLoading && data.totalItems > limit && (
                <Stack py={2} sx={{ bgcolor: 'background.paper' }}>
                  <Pagination count={Math.ceil((data?.totalItems || 0) / pageSize)} page={paginationModel.page + 1} onChange={handlePageChange} color="primary" shape="rounded" siblingCount={1} />
                </Stack>
              )}
            </>
          )}
        </RenderContent>
      </Stack>
    </>
  )
}
