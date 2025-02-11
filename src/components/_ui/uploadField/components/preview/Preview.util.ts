import { IMAGE_EXTENSIONS } from '@/utils'
import { TGetFileDetailsReturn } from './Preview.type'

export const getFileDetails = (file: string | File): TGetFileDetailsReturn => {
  const isFileInstance = file instanceof File

  const url = typeof file === 'string' ? file : URL.createObjectURL(file)
  const urlObject = new URL(url)
  const urlParams = urlObject.searchParams

  const sizeInBytes = isFileInstance ? file.size : urlParams.get('size')
  const fileSize = sizeInBytes ? getSize(+sizeInBytes) : null

  const fileName = isFileInstance ? file.name : urlParams.get('name') || urlObject.pathname.split('/').pop()!
  const fileExtension = fileName.split('.').pop()!

  const isImage = IMAGE_EXTENSIONS.includes(fileExtension)

  return { fileSize, url, fileName, fileExtension, isFileInstance, isImage }
}

const getSize = (fileSizeInBytes: number): string => {
  if (fileSizeInBytes < 1024) return `${fileSizeInBytes} Bytes`
  if (fileSizeInBytes < 1024 ** 2) return `${(fileSizeInBytes / 1024).toFixed(2)} KB`
  return `${(fileSizeInBytes / 1024 ** 2).toFixed(2)} MB`
}
