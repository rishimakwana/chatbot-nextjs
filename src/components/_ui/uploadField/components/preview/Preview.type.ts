export type PreviewProps = {
  data: File | string
  onRemove: () => void
}

export type TGetFileDetailsReturn = {
  url: string
  fileName: string
  fileSize: string | null
  fileExtension: string
  isFileInstance: boolean
  isImage: boolean
}
