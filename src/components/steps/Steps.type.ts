import { IconType } from 'react-icons'

export type StepsProps = {
  activeStep: number
} & (
  | {
      variant: 'icon'
      steps: {
        label: string
        Icon: IconType
      }[]
    }
  | {
      variant: 'number'
      steps: {
        label: string
        Icon?: void
      }[]
    }
)
