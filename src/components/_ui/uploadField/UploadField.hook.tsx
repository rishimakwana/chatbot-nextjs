import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { useController, useFieldArray, useForm } from 'react-hook-form'

import { UploadFieldProps } from './UploadField.type'

export function useHandleFunctionality(props: UploadFieldProps<any, any>) {
  const {
    fieldState: { error },
    field: { onChange, value },
  } = useController({ name: props.name, control: props.control })

  const { control, watch } = useForm<{ files: { file: File | string }[] }>({
    defaultValues: {
      files: value ? (Array.isArray(value) ? value : [value]) : [],
    },
  })

  const { prepend, fields, remove } = useFieldArray({ control, name: 'files' })

  useEffect(() => {
    const subscription = watch(({ files }) => {
      onChange(props.maxFiles === 1 ? files?.[0]?.file || '' : files?.map((item) => item?.file) || [])
    })

    return () => subscription.unsubscribe()
  }, [watch])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return
    prepend(acceptedFiles.map((item) => ({ file: item })))
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
  })

  return {
    fieldState: { error },
    fieldArray: { fields, remove },
    dropzone: { getRootProps, getInputProps },
  }
}
