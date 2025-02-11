import { TApiBase, TRoles } from '@/types'

export type UserDTO = TApiBase & {
  email: string
  fullName: string
  gender?: 'male' | 'female' | 'transgender' | 'declineToState'
  phone: string
  userRoles: TUserRole
  status: 'pending' | 'verified' | 'active' | 'inactive' | 'deteled' | 'underReview'
  profile: TProfile
  documents?: string[]
  isExpress: boolean
  subscriptionStatus: 'active' | 'failed' | 'notStarted' | 'notSetup'
}

type TProfile = {
  id: number
  profilePicUrl?: string
  firmName?: string
  street?: string
  city?: string
  zipCode?: string
  state?: string
  drivingLicenseFront: string
  drivingLicenseBack: string
  isProfileSetup: boolean
}

type TUserRole = {
  roleId: 2
  role: { name: TRoles }
}
