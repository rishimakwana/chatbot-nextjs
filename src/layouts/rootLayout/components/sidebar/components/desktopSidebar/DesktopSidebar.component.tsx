import { useState, useEffect, useRef, useCallback } from 'react'
import { GoPlus, GoSidebarCollapse } from 'react-icons/go'
import { CiSettings } from 'react-icons/ci'
import { BsPlusLg } from 'react-icons/bs'
import { LuCrown } from 'react-icons/lu'

import { IoSearch, IoSettingsOutline, IoArrowUpOutline } from 'react-icons/io5'
import { Stack, Box, Typography, IconButton, InputAdornment, TextField, List, ListItem, ListItemText, ListItemButton, Avatar, Button, Tooltip, CircularProgress } from '@mui/material'

import { useReduxSelector } from '@/hooks'
import Logo from '@/components/logo/Logo.component'
import { style } from './DesktopSidebar.style'
import { useGetAllSessionsQuery } from '@/redux/api/chat.api'
import RenderContent from '@/components/renderContent/RenderContent.component'
import Link from 'next/link'

export default function DesktopSidebar() {
  const sidebarRef = useRef<HTMLElement | null>(null)
  const observerRef = useRef<HTMLElement | null>(null)
  const { isLoggedIn } = useReduxSelector((state) => state.user)
  const [collapsed, setCollapsed] = useState(false)
  const [chats, setChats] = useState<any[]>([])
  const [skip, setSkip] = useState(1)
  const limit = 10

  const { data, isLoading, isError, isSuccess } = useGetAllSessionsQuery({ skip, limit })

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

  useEffect(() => {
    if (!observerRef.current) return
    const observer = new IntersectionObserver(handleScroll, { threshold: 1.0 })
    observer.observe(observerRef.current)
    return () => observer.disconnect()
  }, [handleScroll])

  return (
    <>
      <Stack component="aside" ref={sidebarRef} sx={style.root}>
        {/* Collapse Button */}
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Logo />
          <IconButton onClick={() => setCollapsed(!collapsed)}>
            <GoSidebarCollapse size={24} />
          </IconButton>
        </Stack>

        {/* Non Collapsed Sidebar */}
        {!collapsed && (
          <>
            {/* Profile */}
            {isLoggedIn && (
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} mb={2}>
                <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
                <Box flex={1}>
                  <Typography variant="body2">Steve Smith</Typography>
                  <Typography variant="body2" color="text.secondary">
                    steve@example.com
                  </Typography>
                </Box>
                <IconButton size="small">
                  <IoSettingsOutline size={20} />
                </IconButton>
              </Stack>
            )}

            {/* New Chat Button */}
            <Button component={Link} variant="contained" fullWidth href="/" endIcon={<BsPlusLg size={18} />}>
              New Chat
            </Button>

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

            {/* Recent Chats */}
            <Typography variant="body2" color="text.secondary">
              Recent Chats
            </Typography>

            {/* Recent Chats List */}
            <RenderContent loading={isLoading && skip === 1} error={isError}>
              {isSuccess && chats.length > 0 ? (
                <List sx={{ flex: 1, overflow: 'auto' }}>
                  {chats.map((chat) => (
                    <ListItem key={chat.id} disablePadding>
                      <Tooltip title={collapsed ? chat.title : ''} placement="right">
                        <Link href={`/chat/${chat._id}`} passHref>
                          <ListItemButton sx={{ borderRadius: 1, mb: 0.5, '&:hover': { bgcolor: 'action.hover' } }}>
                            <ListItemText
                              primary={chat?.title?.length > 20 ? chat.title.slice(0, 20) + '...' : chat.title}
                              sx={{
                                '& .MuiListItemText-primary': {
                                  fontSize: '0.875rem',
                                  color: 'text.secondary',
                                  textAlign: collapsed ? 'center' : 'left',
                                },
                              }}
                            />
                          </ListItemButton>
                        </Link>
                      </Tooltip>
                    </ListItem>
                  ))}
                  <ListItem
                    ref={(node) => {
                      observerRef.current = node
                    }}
                    sx={{ display: 'flex', justifyContent: 'center', py: 1 }}
                  >
                    {isLoading && <CircularProgress size={20} />}
                  </ListItem>
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mt: 2 }}>
                  No recent chats
                </Typography>
              )}
            </RenderContent>

            {/* Upgrade Plan */}
            <Stack spacing={1} direction={'row'} py={3}>
              <IoArrowUpOutline size={20} />
              <Stack spacing={0.5}>
                <Typography variant="body1">Upgrade Plan</Typography>
                <Typography variant="body2">Access more features with new plans</Typography>
              </Stack>
            </Stack>
          </>
        )}

        {/* Collapsed Sidebar */}
        {collapsed && (
          <>
            <Stack direction="column" alignItems="center" spacing={2} mb={2}>
              <Avatar sx={{ width: 32, height: 32 }}>S</Avatar>
              <Box flex={1}>
                <CiSettings size={20} />
              </Box>
              <Box flex={1}>
                <GoPlus size={20} />
              </Box>
              <Box flex={1}>
                <LuCrown size={20} />
              </Box>
            </Stack>
          </>
        )}
      </Stack>
    </>
  )
}
