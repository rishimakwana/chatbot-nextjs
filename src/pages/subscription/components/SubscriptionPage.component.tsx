// import Footer from '@/layouts/rootLayout/components/footer/Footer.component'
// import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
// import { useRouter } from 'next/router'
// import { style } from './SubscriptionPage.style'

// const SubscriptionPage = () => {
//   return (
//     <Stack sx={style.root}>gfgfg
//       <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
//         <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
//           Subscription Plan
//         </Typography>
//       </Box>
//       <Box sx={{ display: 'flex', justifyContent: 'center', gap: 3 }}>
//         {/* Standard Plan */}
//         <Card sx={{ maxWidth: 350, p: 3, backgroundColor: '#0A0A32', color: '#fff' }}>
//           <CardContent>
//             <Typography variant="h4" fontWeight="bold">
//               Standard Plan
//             </Typography>
//             <Typography variant="body2">
//               Start for free, no credit card needed.
//             </Typography>
//             <Typography variant="h4" fontWeight="bold" mt={2}>
//               Free Plan
//             </Typography>
//             <Typography variant="body2">Forever</Typography>
//             <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: '#ff4f5a' }}>
//               Continue with Free
//             </Button>
//             <Box mt={2}>
//               <ul>
//                 <li>Unlimited Quick searches.</li>
//                 <li>3 Document uploads per day.</li>
//                 <li>Create a profile to personalize.</li>
//               </ul>
//             </Box>
//           </CardContent>
//         </Card>

//         {/* Enterprise Plan */}
//         <Card sx={{ maxWidth: 350, p: 3, border: '1px solid #ddd' }}>
//           <CardContent>
//             <Typography variant="h4" fontWeight="bold">
//               Enterprise Plan
//             </Typography>
//             <Typography variant="body2" color="gray">
//               Unlock full possibilities with our enterprise plan.
//             </Typography>
//             <Typography variant="h4" fontWeight="bold" mt={2}>
//               $50
//             </Typography>
//             <Typography variant="body2">Per Month</Typography>
//             <Button fullWidth variant="contained" sx={{ mt: 2, bgcolor: '#ff4f5a' }}>
//               Continue with Enterprise
//             </Button>
//             <Box mt={2}>
//               <ul>
//                 <li>Unlimited Quick searches.</li>
//                 <li>3 Document uploads per day.</li>
//                 <li>Create a profile to personalize.</li>
//               </ul>
//             </Box>
//           </CardContent>
//         </Card>
//       </Box>
//       {/* <Footer /> */}
//     </Stack>
//   )
// }

// export default SubscriptionPage

import Footer from '@/layouts/rootLayout/components/footer/Footer.component'
import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/router'

const SubscriptionPage = () => {
  const router = useRouter()

  return (
    <Stack sx={{ p: 4, bgcolor: 'background.paper' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={4}>
          Subscription Plan
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, flexWrap: 'wrap' }}>
        {/* Standard Plan */}
        <Card sx={{ maxWidth: 380, p: 3, backgroundColor: '#0A0A32', color: '#fff', borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold" color="background.paper">
              Standard Plan
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }} color="background.paper">
              Start for free, no credit card needed.
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={2} color="background.paper">
              Free Plan
            </Typography>
            <Typography variant="body2" color="background.paper">
              Forever
            </Typography>
            <Button fullWidth variant="contained" sx={{ mt: 3, bgcolor: '#ff4f5a', borderRadius: 2, color: 'background.paper' }}>
              Continue with Free
            </Button>
            <Box mt={3} component="ul" sx={{ pl: 2 }}>
              <Typography color="background.paper" component="li">
                Unlimited Quick searches.
              </Typography>
              <Typography color="background.paper" component="li">
                3 Document uploads per day.
              </Typography>
              <Typography color="background.paper" component="li">
                Create a profile to personalize.
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Enterprise Plan */}
        <Card sx={{ maxWidth: 380, p: 3, border: '1px solid #ddd', borderRadius: 3 }}>
          <CardContent>
            <Typography variant="h4" fontWeight="bold">
              Enterprise Plan
            </Typography>
            <Typography variant="body2" color="gray">
              Unlock full possibilities with our enterprise plan.
            </Typography>
            <Typography variant="h4" fontWeight="bold" mt={2}>
              $50
            </Typography>
            <Typography variant="body2">Per Month</Typography>
            <Button fullWidth variant="contained" sx={{ mt: 3, bgcolor: '#ff4f5a', borderRadius: 2 }}>
              Continue with Enterprise
            </Button>
            <Box mt={3} component="ul" sx={{ pl: 2 }}>
              <Typography component="li">Unlimited Quick searches.</Typography>
              <Typography component="li">3 Document uploads per day.</Typography>
              <Typography component="li">Create a profile to personalize.</Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Skip Button */}
      <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Typography variant="body2" sx={{ cursor: 'pointer', textDecoration: 'underline' }} onClick={() => router.push('/')}>
          Skip &gt;&gt;
        </Typography>
      </Box>

      {/* Footer */}
      {/* <Box mt={6}>
        <Footer />
      </Box> */}
    </Stack>
  )
}

export default SubscriptionPage
