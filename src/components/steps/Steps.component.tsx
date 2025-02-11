import { Stepper, Step, StepLabel, StepIconProps, Stack } from '@mui/material'

import { makeStyle } from './Steps.style'
import { StepsProps } from './Steps.type'

export default function Steps(props: StepsProps) {
  const { activeStep, steps, variant } = props
  const style = makeStyle(props)

  return (
    <Stepper activeStep={activeStep - 1} alternativeLabel sx={style.root}>
      {steps.map((item, index) => (
        <Step key={index}>
          <StepLabel
            slots={{
              stepIcon: variant === 'icon' ? (stepIconProps) => <StepIcon {...stepIconProps} data={item} sx={style.stepIconRoot} /> : undefined,
            }}
          >
            {item.label}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  )
}

function StepIcon(props: StepIconProps & { data: StepsProps['steps'][0] }) {
  const { active, completed, error, data, sx } = props
  const classList = []
  const Icon = data.Icon!

  if (completed) classList.push('completed')
  if (active) classList.push('active')
  if (error) classList.push('error')

  return (
    <Stack className={classList.join(' ')} sx={sx}>
      <Icon size={24} />
    </Stack>
  )
}
