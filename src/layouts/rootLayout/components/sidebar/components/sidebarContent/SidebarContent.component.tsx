import Link from 'next/link'
import { useRouter } from 'next/router'
import { WiStars } from 'react-icons/wi'
import { GoPencil } from 'react-icons/go'
import { IoSearch } from 'react-icons/io5'
import { MdDeleteForever } from 'react-icons/md'
import { BsPlusLg, BsThreeDots } from 'react-icons/bs'
import { useState, useEffect, useCallback } from 'react'
import {
  Stack,
  Typography,
  InputAdornment,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Button,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  Fab,
  debounce,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material'
import { useInView } from 'react-intersection-observer'

import { useReduxSelector, useUrlParams } from '@/hooks'
import { style } from './SidebarContent.style'
import { TAction, TFilter } from './SidebarContent.type'
import { useDeleteSessionMutation, useLazyGetAllSessionsQuery, useUpdateSessionMutation } from '@/redux/api/chat.api'
import ConfirmationPopup from '@/components/confirmationPopup/ConfirmationPopup.component'
import { useDispatch } from 'react-redux'
import { addSessions, updateSessionTitle } from '@/redux/slice/session.slice'
import { TGetSessionListResponse } from '@/types/session'

export default function SidebarContent() {
  const { setUrlParams } = useUrlParams()
  const router = useRouter()
  const dispatch = useDispatch()
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [selectedChatId, setSelectedChatId] = useState<number | null>(null)
  const [deleteItemId, setDeleteItemId] = useState<number | null>(null)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false)
  const [limit, setLimit] = useState(10)
  const [searchVal, setSearchVal] = useState((router.query.searchVal as string) || '')
  const [deleteSession, { isLoading: isDeleteLoading }] = useDeleteSessionMutation()

  // renameDialog
  const [renameDialogOpen, setRenameDialogOpen] = useState(false)
  const [renamedChatId, setRenamedChatId] = useState<number | null | string>(null)
  const [newChatTitle, setNewChatTitle] = useState('')

  const [updateSession, { isLoading: isUpdateLoading }] = useUpdateSessionMutation()
  const sessions = useReduxSelector((state) => state.session.sessions)

  const filter: TFilter = {
    searchVal,
    page,
    limit,
  }

  const searchDebounce = useCallback(debounce(setUrlParams, 500), [filter])

  const [trigger, { data, isLoading, isSuccess, isFetching }] = useLazyGetAllSessionsQuery()

  const handleClose = () => setTimeout(() => setAnchorEl(null), 200)

  const handleActionClick = (status: string, id: number | string) => {
    if (status === 'delete') {
      setOpenDeleteConfirmation(true)
    } else if (status === 'rename') {
      // setRenamedChatId(id)
      setRenameDialogOpen(true)
      const chatToRename = sessions.find((chat) => chat._id == renamedChatId)
      setNewChatTitle(chatToRename?.title || '')
    }
  }

  const handleRename = async () => {
    if (renamedChatId && newChatTitle.trim()) {
      try {
        await updateSession({
          session_id: renamedChatId,
          title: newChatTitle.trim(),
        }).unwrap()

        dispatch(
          updateSessionTitle({
            session_id: renamedChatId,
            title: newChatTitle.trim(),
          }),
        )

        setRenameDialogOpen(false)
        setRenamedChatId(null)
        setNewChatTitle('')
      } catch (error) {
        console.error('Failed to rename chat', error)
      }
    }
  }

  const handleCloseRenameDialog = () => {
    setRenameDialogOpen(false)
    setRenamedChatId(null)
    setNewChatTitle('')
  }

  const handleCloseDelete = () => {
    setDeleteItemId(null)
    setOpenDeleteConfirmation(false)
  }

  const ACTIONS: TAction[] = [
    { label: 'Rename', Icon: GoPencil, color: 'primary', onClick: (id: number | string) => handleActionClick('rename', id) },
    { label: 'Delete', Icon: MdDeleteForever, color: 'error', onClick: (id: number | string) => handleActionClick('delete', id) },
  ]

  const [scrollTrigger, isInView] = useInView()

  const fetchSessions = async (pageNumber = 1, reset = false) => {
    const filter = { searchVal, page: pageNumber, limit }
    const response = await trigger(filter).unwrap()
    if (response?.list) {
      const existingIds = new Set(sessions.map((chat) => chat._id))
      const uniqueChats = response.list.filter((chat) => !existingIds.has(chat._id))
      const updatedSessions = reset ? response.list : [...sessions, ...uniqueChats]

      dispatch(addSessions(updatedSessions as TGetSessionListResponse[]))
      setHasMore(response.list.length > 0)
      if (reset) setPage(1)
    }
  }

  useEffect(() => {
    fetchSessions(1, true)
  }, [searchVal])

  useEffect(() => {
    if (isInView && hasMore) {
      setPage((prevPage) => {
        const nextPage = prevPage + 1
        fetchSessions(nextPage)
        return nextPage
      })
    }
  }, [isInView, hasMore])

  const handleDelete = async () => {
    if (deleteItemId) {
      await deleteSession(deleteItemId)
      dispatch(addSessions(sessions.filter((session) => session._id != deleteItemId)))
      setDeleteItemId(null)
      setOpenDeleteConfirmation(false)
    }
  }

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
          onChange={(e) => {
            setSearchVal(e.target.value)
            setPage(1)
            // setChats([])
            searchDebounce({ key: 'searchVal', value: e.target.value })
          }}
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
        {isSuccess && !isLoading && sessions.length > 0 ? (
          <Stack flex={1} overflow="auto">
            {/* Recent Chats */}
            <Typography variant="h3" color="text.secondary" fontWeight={500}>
              Recent Chats
            </Typography>
            <List>
              {sessions.map((chat, index) => (
                <>
                  <ListItem
                    ref={scrollTrigger}
                    key={chat._id || index}
                    disablePadding
                    sx={{ display: 'flex', alignItems: 'center', bgcolor: selectedChatId === chat._id ? 'action.selected' : 'transparent', borderRadius: 2 }}
                    onClick={() => setSelectedChatId(chat._id)}
                  >
                    <Link href={`/chat/${chat._id}`} passHref style={{ flex: 1 }}>
                      <ListItemButton sx={{ borderRadius: 1, '&:hover': { bgcolor: 'action.hover' } }}>
                        <ListItemText
                          primary={chat?.title?.length > 20 ? chat.title.slice(0, 20) + '' : chat.title}
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
                    <IconButton
                      onClick={(e) => {
                        setAnchorEl(e.currentTarget)
                        setDeleteItemId(chat._id)
                        setRenamedChatId(chat._id)
                      }}
                      size="small"
                    >
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
              {!hasMore && !isFetching && (
                <ListItem>
                  <ListItemText>
                    <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', width: '100%' }}>
                      No more chats
                    </Typography>
                  </ListItemText>
                </ListItem>
              )}
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
        <Stack spacing={1} direction={'row'} bgcolor={'#EBECF0'} borderRadius={2} p={1.5} component={Link} href="/subscription">
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
          <ConfirmationPopup key="deletePopup" heading="Delete Chat" subheading={`Are you sure to delete this chat?`} acceptButtonText="Delete" loading={isDeleteLoading} onCancel={handleCloseDelete} onAccept={handleDelete} />
        )}

        {/* Delete Chat */}
        <Dialog open={renameDialogOpen} onClose={handleCloseRenameDialog} maxWidth="xs" fullWidth>
          <DialogTitle>Rename Title</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Chat Name"
              fullWidth
              variant="outlined"
              value={newChatTitle}
              onChange={(e) => setNewChatTitle(e.target.value)}
              error={!newChatTitle.trim()}
              helperText={!newChatTitle.trim() ? 'Chat name cannot be empty' : ''}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="inherit" onClick={handleCloseRenameDialog}>
              Cancel
            </Button>
            <Button variant="orange" onClick={handleRename} disabled={!newChatTitle.trim() || isUpdateLoading}>
              Rename
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </>
  )
}
