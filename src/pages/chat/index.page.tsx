// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import { Box, TextField, Container, Stack, Button } from '@mui/material'
// import { IoStatsChart, IoChatbubbleEllipses, IoCreateOutline, IoHelpCircle } from 'react-icons/io5'
// import { FaCircleArrowUp } from 'react-icons/fa6'

// export default function Dashboard() {
//   const [message, setMessage] = useState('')
//   const [loading, setLoading] = useState(false)
//   const router = useRouter()
//   const { id } = router.query

//   // Redirect to chat/[id] if id is present
//   useEffect(() => {
//     if (id) {
//       router.push(`/chat/${id}`)
//     }
//   }, [id, router])

//   const hasInput = message.trim().length > 0

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     console.log(message)
//     setMessage('')
//   }

//   const handleApiCall = async () => {
//     setLoading(true)
//     try {
//       await new Promise((resolve) => setTimeout(resolve, 2000))
//       router.push(`/chat/${78965}`)
//       console.log('API call started')
//     } catch (error) {
//       console.error('Error:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <Container
//       maxWidth="md"
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'center',
//         py: { xs: 2, md: 4 },
//         gap: 2,
//       }}
//     >
//       {/* Main Question */}
//       <Box
//         sx={{
//           textAlign: 'center',
//           mb: { xs: 3, md: 4 },
//         }}
//       >
//         <Box
//           component="h1"
//           sx={{
//             fontSize: { xs: '1.5rem', md: '2rem' },
//             fontWeight: 600,
//             color: '#1a1a1a',
//             mb: 0,
//           }}
//         >
//           What do you want to know?
//         </Box>
//       </Box>

//       {/* Input Form */}
//       <Box>
//         <Box sx={{ position: 'relative', mb: 1 }}>
//           <TextField
//             fullWidth
//             multiline
//             rows={3}
//             placeholder="Ask anything..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             slotProps={{
//               input: {
//                 endAdornment: hasInput && (
//                   <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '8px', cursor: 'pointer' }} onClick={handleApiCall}>
//                     <FaCircleArrowUp size={18} color="#666" />
//                   </Box>
//                 ),
//               },
//             }}
//             sx={{
//               '& .MuiOutlinedInput-root': {
//                 backgroundColor: '#f8f9fa',
//                 borderRadius: '12px',
//                 '& fieldset': {
//                   borderColor: '#e0e0e0',
//                 },
//                 '&:hover fieldset': {
//                   borderColor: '#bdbdbd',
//                 },
//                 '&.Mui-focused fieldset': {
//                   borderColor: '#9e9e9e',
//                 },
//               },
//               '& .MuiOutlinedInput-input': {
//                 padding: '16px',
//               },
//             }}
//           />
//         </Box>

//         {/* Action Buttons */}
//         <Stack
//           direction="row"
//           spacing={1}
//           sx={{
//             mt: 5,
//             flexWrap: 'wrap',
//             gap: 1,
//             '& .MuiButton-root': {
//               borderColor: '#e0e0e0',
//               color: '#666',
//               textTransform: 'none',
//               padding: '6px 16px',
//               minWidth: 'auto',
//               borderRadius: '20px',
//               fontSize: '0.875rem',
//               '&:hover': {
//                 borderColor: '#bdbdbd',
//                 backgroundColor: '#f5f5f5',
//               },
//             },
//           }}
//         >
//           <Button variant="outlined" startIcon={<IoStatsChart size={18} />}>
//             Analyze data
//           </Button>
//           <Button variant="outlined" startIcon={<IoChatbubbleEllipses size={18} />}>
//             Start Chat
//           </Button>
//           <Button variant="outlined" startIcon={<IoHelpCircle size={18} />}>
//             Start Q&A
//           </Button>
//           <Button variant="outlined" startIcon={<IoCreateOutline size={18} />}>
//             Help me write
//           </Button>
//         </Stack>      </Box>
//     </Container>
//   )
// }
