import Link from 'next/link'
import { useRouter } from 'next/router'
import { WiStars } from 'react-icons/wi'
import { GoPencil } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'
import { MdDeleteForever } from 'react-icons/md'
import { BsPlusLg, BsThreeDots } from 'react-icons/bs'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Stack, Typography, InputAdornment, TextField, List, ListItem, ListItemText, ListItemButton, Button, IconButton, Menu, MenuItem, ListItemIcon, Fab, debounce } from '@mui/material'

import { style } from './SidebarContent.style'
import { useUrlParams } from '@/hooks'
import { useDeleteSessionMutation, useGetAllSessionsQuery, useLazyGetAllSessionsQuery } from '@/redux/api/chat.api'
import { TAction, TFilter } from './SidebarContent.type'
import ConfirmationPopup from '@/components/confirmationPopup/ConfirmationPopup.component'

export default function SidebarContent() {
  const { setUrlParams } = useUrlParams()
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [chats, setChats] = useState<any[]>([])
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const [limit, setLimit] = useState(10)
  const [searchVal, setSearchVal] = useState((router.query.searchVal as string) || '')

  const [deleteSession, { isLoading: isDeleteLoading }] = useDeleteSessionMutation()
  const chatsRef = useRef<HTMLUListElement | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const filter: TFilter = {
    searchVal,
    page,
    limit,
  }

  const searchDebounce = useCallback(debounce(setUrlParams, 500), [filter])

  const [trigger, { data, isLoading, isSuccess, isFetching }] = useLazyGetAllSessionsQuery()

  useEffect(() => {
    trigger(filter)
      .unwrap()
      .then((res) => {
        setChats((prevChats) => (page === 1 ? res.list : [...prevChats, ...res.list]))
        setIsLoadingMore(res.list.length === limit)
      })
  }, [page, searchVal])

  const loadMoreSessions = () => {
    if (isLoadingMore) return
    setIsLoadingMore(true)
    setPage((prev) => prev + 1)
  }
  useEffect(() => {
    if (!chatsRef.current) return
    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreSessions()
        }
      },
      { threshold: 1.0 },
    )
    const lastItem = chatsRef.current.lastElementChild
    if (lastItem) observerRef.current.observe(lastItem)
    return () => observerRef.current?.disconnect()
  }, [chats, isFetching])

  const handleClose = () => setTimeout(() => setAnchorEl(null), 200)

  const handleActionClick = (status: string, id: number) => {
    if (status === 'delete') {
      setDeleteItemId(id)
      setOpenDeleteConfirmation(true)
    } else if (status === 'rename') {
      // Open rename editor
    }
  }

  const handleCloseDelete = () => {
    setOpenDeleteConfirmation(false)
    setDeleteItemId(null)
  }

  const ACTIONS: TAction[] = [
    { label: 'Rename', Icon: GoPencil, color: 'primary', onClick: (id: number) => handleActionClick('rename', id) },
    { label: 'Delete', Icon: MdDeleteForever, color: 'error', onClick: (id: number) => handleActionClick('delete', id) },
  ]

  return (
    <>
      <Stack component="nav" sx={style.root}>
        {/* New Chat Button */}
        <Link href="/">
          {/* onClick={() => dispatch(clearMessages())} */}
          <Button variant="orange" fullWidth endIcon={<BsPlusLg size={18} />}>
            New Chat
          </Button>
        </Link>

        {/* Search Bar */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search chat"
          defaultValue={filter.searchVal}
          onChange={(e) => searchDebounce({ key: 'searchVal', value: e.target.value })}
          slotProps={{
            input: {
              sx: { height: 40, borderRadius: '6px' },
              startAdornment: (
                <InputAdornment position="start">
                  <IoSearch size={20} />
                </InputAdornment>
              ),
            },
          }}
        />
        {/* Recent Chats List */}
        {isSuccess && !isLoading && chats.length > 0 ? (
          <Stack flex={1} overflow="auto">
            {/* Recent Chats */}
            <Typography variant="h3" color="text.secondary" fontWeight={500}>
              Recent Chats
            </Typography>
            <List ref={chatsRef}>
              {chats.map((chat, index) => (
                <>
                  <ListItem key={chat._id || index} disablePadding sx={{ display: 'flex', alignItems: 'center' }}>
                    <Link href={`/chat/${chat._id}`} passHref style={{ flex: 1 }}>
                      <ListItemButton sx={{ borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                        <ListItemText
                          primary={chat?.title?.length > 20 ? chat.title.slice(0, 20) + '...' : chat.title}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '0.875rem',
                              color: 'text.secondary',
                              textAlign: 'left',
                            },
                          }}
                        />
                      </ListItemButton>
                    </Link>
                    {/* Menu Icon */}
                    <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} size="small">
                      <BsThreeDots />
                    </IconButton>
                  </ListItem>
                  {/* Mobile Actions */}
                  <Menu open={!!anchorEl} anchorEl={anchorEl} onClose={handleClose}>
                    {ACTIONS.map((item, index) => (
                      <MenuItem
                        key={index}
                        disabled={item.disable}
                        onClick={() => {
                          handleClose(), item.onClick(chat._id)
                        }}
                      >
                        <ListItemIcon>
                          <Fab size="small" color={item.color} sx={style.mobileActionIcon}>
                            {<item.Icon className="icon-xs" />}
                          </Fab>
                        </ListItemIcon>
                        <ListItemText>{item.label}</ListItemText>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ))}
              {/* <ListItem
                ref={(node) => {
                  observerRef.current = node
                }}
                sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
              >
                {isLoading && <CircularProgress size={20} />}

              </ListItem> */}
            </List>
          </Stack>
        ) : (
          <List sx={{ flex: 1, overflow: 'auto' }}>
            <ListItem disablePadding>
              <ListItemText>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
                  No recent chats
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        )}
        {/* Upgrade Plan */}
        <Stack spacing={1} direction={'row'} bgcolor={'#EBECF0'} borderRadius={2} p={1.5}>
          <Stack sx={style.upgradePlan}>
            <WiStars size={22} />
          </Stack>
          <Stack spacing={0.5}>
            <Typography variant="body1">Upgrade Plan</Typography>
            <Typography variant="body2">Access more features with new plans</Typography>
          </Stack>
        </Stack>
        {/* Delete Chat */}
        {openDeleteConfirmation && (
          <ConfirmationPopup
            key="deletePopup"
            heading="Delete Chat"
            subheading={`Are you sure to delete this chat?`}
            acceptButtonText="Delete"
            loading={isDeleteLoading}
            onCancel={handleCloseDelete}
            onAccept={() =>
              deleteSession(deleteItemId as number)
                .unwrap()
                .then(handleCloseDelete)
            }
          />
        )}
      </Stack>
    </>
  )
}
