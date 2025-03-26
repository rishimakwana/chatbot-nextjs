import { TApiBase } from '@/types'

export type UserDTO = TApiBase & {
  email: string
  fullName: string
  phone: string
  status: 'pending' | 'verified' | 'active' | 'inactive' | 'deteled' | 'underReview'
  subscriptionStatus: 'active' | 'failed' | 'notStarted' | 'notSetup'
  modified_at: string
  otp: number
  verified: boolean
}
