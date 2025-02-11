import toast from 'react-hot-toast'
import { useState } from 'react'
import { LoadingButton } from '@mui/lab'
import { RxCheckCircled } from 'react-icons/rx'
import { Box, Card, Checkbox, FormControlLabel, Stack, Typography, Link as MuiLink, alpha, Alert } from '@mui/material'

// import CircleBackground from '@/components/circleBackground/CircleBackground.component'
import PlanPolicyPopup from './components/planPolicyPopup/PlanPolicyPopup.component'
import { SubscriptionPlanCardProps } from './SubscriptionPlanCard.type'
import { style } from './SubscriptionPlanCard.style'
import { formatToTitleCase } from '@/utils'

export default function SubscriptionPlanCard(props: SubscriptionPlanCardProps) {
  const { data, onCheckout, loading, disabled, viewOnly, showPolicy, slotProps } = props
  const [acceptPolicy, setAcceptPolicy] = useState(showPolicy === false)
  const [showPlanPolicy, setShowPlanPolicy] = useState(false)

  const handleCheckout = () => {
    if (!viewOnly) {
      if (!acceptPolicy) return toast.error('Accept plan policy before continue')
      onCheckout()
    }
  }

  return (
    <Card sx={style.root}>
      {/* Header */}
      <Stack gap={1}>
        <Typography variant="h2" sx={style.heading}>
          {data.title}
        </Typography>

        <Typography variant="body2" sx={style.planBenefit}>
          (Best Value for Lifetime Document Security)
        </Typography>
      </Stack>

      {/* Price */}
      <Stack sx={style.priceBox}>
        <Typography component="del" variant="display2" sx={style.delPrice}>
          ${data.amount}
        </Typography>
        <Stack direction="row" gap="inherit">
          <Typography variant="display1" sx={style.mainPrice}>
            ${data.discountedAmount}
          </Typography>
          <Typography sx={style.duration}>/&nbsp;{formatToTitleCase(data.type)}</Typography>
        </Stack>
      </Stack>

      {!viewOnly && (
        <Stack sx={style.actionBox}>
          {/* Plan Policy */}
          {showPolicy !== false && (
            <FormControlLabel
              sx={style.policy}
              label={
                <>
                  I've read and accept the{' '}
                  <MuiLink
                    color="textPrimary"
                    onClick={(e) => {
                      e.preventDefault()
                      setShowPlanPolicy(true)
                    }}
                  >
                    plan policy
                  </MuiLink>
                </>
              }
              control={<Checkbox value={acceptPolicy} onChange={(_, newValue) => setAcceptPolicy(newValue)} />}
            />
          )}

          <Alert severity="info" variant="outlined" sx={style.message}>
            Amount will be charged only when the document is stored in the vault.
          </Alert>

          {/* Action */}
          <LoadingButton variant="contained" fullWidth onClick={handleCheckout} loading={loading} disabled={disabled} sx={style.button}>
            {slotProps?.button?.text || 'Click to Secure Now'}
            <Typography className="price">($0 / Yearly)</Typography>
          </LoadingButton>
        </Stack>
      )}

      {/* Features */}
      <Stack gap={2}>
        <Typography variant="h3" color="text.primary">
          Why Choose SafeDox?
        </Typography>
        <Stack sx={style.featuresList}>
          {data.features.map((item, index) => (
            <Stack sx={style.featuresItem} key={index}>
              <Box component={RxCheckCircled} size={22} sx={style.checkIcon} />
              <Typography color="text.primary">{item}</Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* Circle Background */}
      {/* <CircleBackground color={data.colorCode} sx={{ bgcolor: alpha(data.colorCode, 0.15) }} /> */}

      {/* Plan Policy Popup */}
      {showPlanPolicy && <PlanPolicyPopup onClose={() => setShowPlanPolicy(false)} />}
    </Card>
  )
}
