import { TGetFileDetailsReturn } from '../preview/Preview.type'

export type FileDetailPopupProps = TGetFileDetailsReturn & {
  onClose: () => void
  open: boolean
}
