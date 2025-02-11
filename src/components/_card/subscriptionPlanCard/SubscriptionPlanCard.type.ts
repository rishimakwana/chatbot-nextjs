import { SubscriptionPlanDTO } from '@/dto'

export type SubscriptionPlanCardProps = {
  data: SubscriptionPlanDTO
  slotProps?: {
    button?: {
      text?: string
    }
  }
} & (
  | {
      viewOnly: true
      onCheckout?: void
      showPolicy?: void
      loading?: void
      disabled?: void
    }
  | {
      viewOnly: false
      onCheckout: () => void
      showPolicy?: boolean
      loading: boolean
      disabled: boolean
    }
)
