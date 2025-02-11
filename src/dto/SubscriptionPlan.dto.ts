import { TApiBase } from '@/types'

export type SubscriptionPlanDTO = TApiBase & {
  id: number
  title: string
  type: string
  amount: string
  discountedAmount: string
  status: 'active' | 'inactive'
  isBestValue: true
  features: string[]
  colorCode: string
}
