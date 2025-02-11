// import React, { useEffect, useRef, useState } from 'react'
// import { useRouter } from 'next/router'
// import Link from 'next/link'
// import { List, ListItemButton, ListItemText, Typography, CircularProgress, Box } from '@mui/material'
// import { useGetAllSessionsQuery } from '@/redux/api/chat.api'
// import { formatDate, groupChatsByDate } from '@/utils/chatUtils'

// export default function ChatHistory() {
//   const router = useRouter()
//   const [pagination, setPagination] = useState({ skip: 0, limit: 10 })
//   const [allSessions, setAllSessions] = useState([])
//   const { data: sessionData, isLoading, error } = useGetAllSessionsQuery(pagination)
//   const containerRef = useRef<HTMLDivElement | null>(null)

//   useEffect(() => {
//     if (sessionData?.data) {
//       setAllSessions((prev) => {
//         const newSessions = sessionData.data.filter((session) => !prev.some((existing) => existing._id === session._id))
//         return [...prev, ...newSessions]
//       })
//     }
//   }, [sessionData])

//   const chatGroups = groupChatsByDate(allSessions, isLoading, error)

//   const loadMoreSessions = () => {
//     if (sessionData?.total > pagination.skip + pagination.limit) {
//       setPagination((prev) => ({ ...prev, skip: prev.skip + prev.limit }))
//     }
//   }

//   useEffect(() => {
//     const handleScroll = () => {
//       if (containerRef.current) {
//         const { scrollTop, scrollHeight, clientHeight } = containerRef.current
//         if (scrollTop + clientHeight >= scrollHeight - 10) {
//           loadMoreSessions()
//         }
//       }
//     }

//     const container = containerRef.current
//     if (container) container.addEventListener('scroll', handleScroll)

//     return () => {
//       if (container) {
//         container.removeEventListener('scroll', handleScroll)
//       }
//     }
//   }, [sessionData])


//   const handleChatClick = () => {
//     // if (window.matchMedia('(max-width: 768px)').matches && state !== 'collapsed') {
//     //   toggleSidebar()
//     // }
//   }

//   return (
//     <Box ref={containerRef} style={{ height: 'calc(100vh - 100px)', overflowY: 'auto' }}>
//       {isLoading && <CircularProgress size={24} style={{ display: 'block', margin: 'auto' }} />}
//       {!isLoading && chatGroups.length === 0 && (
//         <Typography align="center" color="textSecondary" sx={{ pt: 2 }}>
//           No chats found
//         </Typography>
//       )}
//       {chatGroups.map((group) => (
//         <Box key={group.date} style={{ margin: '16px 0' }}>
//           <Typography variant="body2" color="primary" sx={{ pl: 2 }}>
//             {formatDate(group.date)}
//           </Typography>
//           <List>
//             {group.chats.map((chat) => {
//               const isActive = router.asPath === `/chat/${chat.id}`
//               return (
//                 <ListItemButton
//                   key={chat.id}
//                   component={Link}
//                   href={`/chat/${chat.id}`}
//                   selected={isActive}
//                   sx={{
//                     backgroundColor: isActive ? 'action.selected' : 'inherit',
//                     borderLeft: isActive ? '4px solid #b6872b' : 'none',
//                   }}
//                   onClick={handleChatClick}
//                 >
//                   <ListItemText primary={chat.title} primaryTypographyProps={{ noWrap: true }} />
//                 </ListItemButton>
//               )
//             })}
//           </List>
//         </Box>
//       ))}
//     </Box>
//   )
// }
