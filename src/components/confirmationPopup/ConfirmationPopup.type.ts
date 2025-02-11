export type ConfirmationPopupProps = {
  heading: React.ReactNode
  subheading: React.ReactNode
  loading?: boolean
  cancelButtonText?: string
  acceptButtonText: string
  onCancel: () => void
  onAccept: () => void
}
