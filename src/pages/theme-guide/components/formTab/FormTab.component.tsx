import moment from 'moment'
import { useState } from 'react'
import { IconButton, InputLabel, ListItemText, MenuItem, Radio, RadioGroup, Select, Stack, Switch, TextField } from '@mui/material'
import { Autocomplete, Button, Checkbox, Chip, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid2 } from '@mui/material'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { MobileDatePicker, MobileTimePicker } from '@mui/x-date-pickers'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { LoadingButton } from '@mui/lab'

import InputField from '@/components/_ui/inputField/InputField.component'
import PhoneField from '@/components/_ui/phoneField/PhoneField.component'
import RecaptchaField from '@/components/_ui/recaptchaField/RecaptchaField.component'
import FileField from '@/components/_ui/fileField/FileField.component'
import UploadField from '@/components/_ui/uploadField/UploadField.component'
import { TSchema, schema, FORM_DATA, TOP_FIlMS } from './FormTab.config'

export default function FormTab() {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const {
    handleSubmit,
    control,
    reset,
    trigger,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<TSchema>({
    resolver: yupResolver(schema),
  })

  console.log(watch(), errors)

  const onSubmit = (formData: TSchema) => {
    console.log({ formData })
  }

  const loadData = async () => {
    const [keys, values] = [Object.keys(FORM_DATA), Object.values(FORM_DATA)]
    keys.map((item: any, index: number) => setValue(item, values[index]))
    trigger()
  }

  return (
    <Grid2 container noValidate component="form" onSubmit={handleSubmit(onSubmit)}>
      {/* Actions */}
      <Grid2 size={12}>
        <Stack direction="row" justifyContent="end" spacing={1}>
          <Button variant="outlined" onClick={() => reset()}>
            Reset
          </Button>
          <Button variant="outlined" onClick={loadData}>
            Load Data
          </Button>
          <LoadingButton variant="contained" type="submit" loading={isSubmitting}>
            Submit
          </LoadingButton>
        </Stack>
      </Grid2>

      {/* Text */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <InputField name="text" label="Text" control={control} />
      </Grid2>

      {/* Number */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <InputField name="number" label="Number" type="number" control={control} />
      </Grid2>

      {/* Email */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <InputField name="email" label="Email" type="email" control={control} />
      </Grid2>

      {/* Phone */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <PhoneField name="phone" control={control} />
      </Grid2>

      {/* Date Picker */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="date"
          control={control}
          render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) => (
            <MobileDatePicker
              {...restField}
              label="Date"
              inputRef={ref}
              value={value ? moment(value) : null}
              onChange={(value) => onChange(value?.toISOString())}
              slotProps={{
                textField: { error: !!error, helperText: error?.message },
              }}
            />
          )}
        />
      </Grid2>

      {/* Time Picker */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="time"
          control={control}
          render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) => (
            <MobileTimePicker
              {...restField}
              label="Time"
              inputRef={ref}
              value={value ? moment(value) : null}
              onChange={(value) => onChange(value?.toISOString())}
              slotProps={{
                textField: { error: !!error, helperText: error?.message },
              }}
            />
          )}
        />
      </Grid2>

      {/* URL */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <InputField name="url" label="URL" control={control} />
      </Grid2>

      {/* Select */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="select"
          control={control}
          defaultValue=""
          render={({ fieldState: { error }, field: { ref, ...restField } }) => (
            <FormControl error={!!error}>
              <InputLabel>Select</InputLabel>
              <Select {...restField} inputRef={ref} label="Select">
                <MenuItem value="option1">Option 1</MenuItem>
                <MenuItem value="option2">Option 2</MenuItem>
                <MenuItem value="option3">Option 3</MenuItem>
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid2>

      {/* Multiple Select */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="multipleSelect"
          control={control}
          defaultValue={[]}
          render={({ fieldState: { error }, field: { ref, ...restField } }) => (
            <FormControl error={!!error}>
              <InputLabel>Multiple select</InputLabel>
              <Select
                {...restField}
                multiple
                inputRef={ref}
                label="Multiple select"
                renderValue={(selected) => {
                  const selectedItemsLabel = selected.map((selectedItem) => TOP_FIlMS.find((item) => item.id === selectedItem)?.label) || 'notFound'
                  return (
                    <Stack flexWrap="wrap" direction="row" gap={0.5}>
                      {selectedItemsLabel.map((item, index) => (
                        <Chip key={index} label={item} size="medium" />
                      ))}
                    </Stack>
                  )
                }}
              >
                {TOP_FIlMS.map((item, index) => (
                  <MenuItem value={item.id} key={index}>
                    <Checkbox size="small" edge="start" disableRipple checked={restField.value.indexOf(item.id) > -1} />
                    <ListItemText primary={item.label} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid2>

      {/* Autocomplete */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="autocomplete"
          control={control}
          render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) => (
            <Autocomplete
              {...restField}
              value={value || null}
              options={TOP_FIlMS}
              onChange={(_, value) => onChange(value)}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              renderInput={(params) => (
                <TextField {...params} label="Autocomplete" inputRef={ref} error={!!error} helperText={error?.message} slotProps={{ htmlInput: { ...params.inputProps, autoComplete: 'new-password' } }} />
              )}
            />
          )}
        />
      </Grid2>

      {/* Multiple Autocomplete */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="multipleAutocomplete"
          control={control}
          render={({ fieldState: { error }, field: { ref, value, onChange, ...restField } }) => (
            <Autocomplete
              {...restField}
              multiple
              disableCloseOnSelect
              value={value || []}
              options={TOP_FIlMS}
              onChange={(_, value) => onChange(value)}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.label === value.label}
              renderInput={(params) => (
                <TextField {...params} label="Multipel autocomplete" inputRef={ref} error={!!error} helperText={error?.message} slotProps={{ htmlInput: { ...params.inputProps, autoComplete: 'new-password' } }} />
              )}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox edge="start" size="small" checked={selected} disableRipple />
                  {option.label}
                </li>
              )}
            />
          )}
        />
      </Grid2>

      {/* Password */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <InputField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          control={control}
          slotProps={{
            input: {
              endAdornment: <IconButton onClick={() => setShowPassword((v) => !v)}>{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
            },
          }}
        />
      </Grid2>

      {/* Confirm Password */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <InputField
          name="confirmPassword"
          label="Confirm Password"
          type={showPassword ? 'text' : 'password'}
          control={control}
          slotProps={{
            input: {
              endAdornment: <IconButton onClick={() => setShowPassword((v) => !v)}>{showPassword ? <MdVisibility /> : <MdVisibilityOff />}</IconButton>,
            },
          }}
        />
      </Grid2>

      {/* Image */}
      <Grid2 size={12}>
        <UploadField name="image" heading="Drag and drop document, or Browse" description="Support jpg, png, doc, zip and rar documents" control={control} maxFiles={5} />
      </Grid2>

      {/* File */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <FileField name="file" label="File" accept="application/pdf" control={control} />
      </Grid2>

      {/* Radio */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="radio"
          control={control}
          defaultValue=""
          render={({ fieldState: { error }, field: { ref, ...restField } }) => (
            <FormControl error={!!error}>
              <FormLabel>Radio</FormLabel>
              <RadioGroup {...restField} row>
                <FormControlLabel inputRef={ref} value="radio1" label="Radio 1" control={<Radio />} componentsProps={{ typography: { color: error ? 'error.main' : undefined } }} />
                <FormControlLabel inputRef={ref} value="radio2" label="Radio 2" control={<Radio />} componentsProps={{ typography: { color: error ? 'error.main' : undefined } }} />
              </RadioGroup>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid2>

      {/* Multiple Checkbox */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="multipleCheckbox"
          control={control}
          defaultValue={[]}
          render={({ fieldState: { error }, field: { value, onChange, ref } }) => (
            <FormControl error={!!error}>
              <FormLabel>Multiple Checkbox</FormLabel>
              <FormGroup row>
                {[
                  { label: 'Label 1', value: 'label1' },
                  { label: 'Label 2', value: 'label2' },
                ].map((item, index) => (
                  <FormControlLabel
                    key={index}
                    label={item.label}
                    slotProps={{ typography: { color: error ? 'error.main' : undefined } }}
                    control={<Checkbox inputRef={ref} checked={value.includes(item.value)} onChange={(e) => (e.target.checked ? onChange([...value, item.value]) : onChange(value.filter((val) => val != item.value)))} />}
                  />
                ))}
              </FormGroup>
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid2>

      {/* Single Checkbox */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="singleCheckbox"
          control={control}
          defaultValue={false}
          render={({ fieldState: { error }, field: { ref, value, ...restField } }) => (
            <FormControl error={!!error}>
              <FormLabel>Single Checkbox</FormLabel>
              <FormControlLabel label="Accept privacy & policy." componentsProps={{ typography: { color: error ? 'error.main' : undefined } }} control={<Checkbox {...restField} inputRef={ref} checked={value} />} />
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid2>

      {/* Switch */}
      <Grid2 size={{ xs: 12, sm: 6 }}>
        <Controller
          name="switch"
          control={control}
          defaultValue={false}
          render={({ fieldState: { error }, field: { ref, value, ...restField } }) => (
            <FormControl error={!!error}>
              <FormLabel>Switch</FormLabel>
              <FormControlLabel label="Switch description" componentsProps={{ typography: { color: error ? 'error.main' : undefined } }} control={<Switch {...restField} inputRef={ref} checked={value} />} />
              <FormHelperText>{error?.message}</FormHelperText>
            </FormControl>
          )}
        />
      </Grid2>

      {/* Recaptcha */}
      <Grid2 size={12}>
        <RecaptchaField name="recaptchaToken" control={control} />
      </Grid2>
    </Grid2>
  )
}
