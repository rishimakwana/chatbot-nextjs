import { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { FormHelperText, FormControl, Stack } from '@mui/material'
import { FieldPath, FieldValues, useController } from 'react-hook-form'

import Placeholder from './components/placeholder/Placeholder.component'
import Preview from './components/preview/Preview.component'
import { UploadFieldProps } from './UploadField.type'
import { style } from './UploadField.style'
import toast from 'react-hot-toast'

// TODO: This component is under development
export default function UploadField<TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>(props: UploadFieldProps<TFieldValues, TName>) {
  props = { ...props, maxFiles: props.maxFiles || 1, size: props.size || 'medium' }
  const { name, control, maxFiles } = props

  const {
    fieldState: { error },
    field: { onChange, value, ref },
  } = useController({ name, control })

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) return
      onChange(maxFiles === 1 ? acceptedFiles[0] : [...acceptedFiles, ...(value || [])])
    },
    [value],
  )

  const { getRootProps, getInputProps, inputRef } = useDropzone({
    onDrop,
    onDropRejected: () => {
      toast.error('Only .pdf file is accepted')
    },
    maxFiles,
    multiple: maxFiles! > 1,
    accept: {
      'application/pdf': ['.pdf'],
    },
  })

  ref(inputRef.current)

  const handleRemove = (itemIndex: number) => {
    const filteredFiles = files.filter((item, index) => index !== itemIndex)
    onChange(maxFiles === 1 ? filteredFiles[0] || '' : filteredFiles)
  }

  const files = value ? (Array.isArray(value) ? value : [value]) : []
  const showPlaceholder = maxFiles! > files.length

  return (
    <FormControl error={!!error}>
      <Stack className={`${error ? 'error' : ''}`} sx={{ ...style.rootContainer, pt: showPlaceholder ? undefined : 1 }}>
        {/* Upload Placeholder */}
        {showPlaceholder && (
          <Stack {...getRootProps()} sx={style.placeholderContainer}>
            <Placeholder {...props} />
            <input {...getInputProps()} />
          </Stack>
        )}

        {/* Preview */}
        {!!files.length && (
          <Stack>
            {files.map((item, index) => (
              <Preview data={item} onRemove={() => handleRemove(index)} key={index} />
            ))}
          </Stack>
        )}
      </Stack>

      {/* Message */}
      <FormHelperText>{error ? error?.message : props.helperText}</FormHelperText>
    </FormControl>
  )
}
