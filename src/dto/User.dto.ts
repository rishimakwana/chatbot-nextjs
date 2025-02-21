import { TApiBase } from '@/types'

export type UserDTO = TApiBase & {
  email: string
  fullName: string
  gender?: 'male' | 'female' | 'transgender' | 'declineToState'
  phone: string
  status: 'pending' | 'verified' | 'active' | 'inactive' | 'deteled' | 'underReview'
  documents?: string[]
  isExpress: boolean
  subscriptionStatus: 'active' | 'failed' | 'notStarted' | 'notSetup'
}
