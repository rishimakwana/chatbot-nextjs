import Link from 'next/link'
import { WiStars } from 'react-icons/wi'
import { BsPlusLg, BsThreeDots } from 'react-icons/bs'
import { IoSearch } from 'react-icons/io5'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Stack, Typography, InputAdornment, TextField, List, ListItem, ListItemText, ListItemButton, Button, IconButton, Menu, MenuItem, ListItemIcon, Fab } from '@mui/material'

import { style } from './SidebarContent.style'
import { useReduxDispatch } from '@/hooks'
import { useDeleteSessionMutation, useGetAllSessionsQuery } from '@/redux/api/chat.api'
import { TAction } from './SidebarContent.type'
import { GoPencil } from 'react-icons/go'
import { MdDeleteForever } from 'react-icons/md'
import ConfirmationPopup from '@/components/confirmationPopup/ConfirmationPopup.component'

export default function SidebarContent() {
  const dispatch = useReduxDispatch()
  const [skip, setSkip] = useState(1)
  const [chats, setChats] = useState<any[]>([])
  const observerRef = useRef<HTMLElement | null>(null)
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const limit = 10
  const [deleteSession, { isLoading: isDeleteLoading }] = useDeleteSessionMutation()

  const { data, isLoading, isSuccess } = useGetAllSessionsQuery({ skip, limit })

  useEffect(() => {
    if (isSuccess && data && data.list) {
      setChats((prevChats) => {
        const existingIds = new Set(prevChats.map((chat) => chat._id))
        const newChats = data.list.filter((chat: any) => !existingIds.has(chat._id))
        return [...prevChats, ...newChats]
      })
    }
  }, [data, isSuccess])

  const handleScroll = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0]
      if (target.isIntersecting && !isLoading) {
        setSkip((prevSkip) => prevSkip + 1)
      }
    },
    [isLoading],
  )

  const handleClose = () => setTimeout(() => setAnchorEl(null), 200)

  const handleActionClick = (status: string, id: number) => {
    if (status === 'delete') {
      setDeleteItemId(id)
      setOpenDeleteConfirmation(true)
    } else if (status === 'rename') {
      // Open rename editor
    }
  }

  useEffect(() => {
    if (!observerRef.current) return
    const observer = new IntersectionObserver(handleScroll, { threshold: 1.0 })
    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [handleScroll])

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
            <List sx={{ flex: 1, overflow: 'auto' }}>
              {chats.map((chat, index) => (
                <>
                  <ListItem key={chat._id || index} disablePadding sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href={`/chat/${chat._id}`} passHref>
                      <ListItemButton sx={{ borderRadius: 1, mb: 0.5, '&:hover': { bgcolor: 'action.hover' } }}>
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
                  <Menu
                    open={!!anchorEl}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    sx={{
                      boxShadow: '0px 4px 6px rgba(211, 106, 106, 0.1)',
                    }}
                  >
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
        {/* Delete Chat */} {deleteItemId}
        {openDeleteConfirmation && (
          <ConfirmationPopup
            key="deletePopup"
            heading="Delete Chat"
            subheading={`Are you sure to delete this chat?`}
            acceptButtonText="Delete"
            loading={isDeleteLoading}
            onCancel={() => setDeleteItemId(null)}
            onAccept={() =>
              deleteSession(deleteItemId as number)
                .unwrap()
                .then(() => setDeleteItemId(null))
            }
          />
        )}
      </Stack>
    </>
  )
}
