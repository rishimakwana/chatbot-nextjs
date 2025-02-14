export type MessageInputProps = {
  loading: boolean
  onMessage: (question: string) => Promise<void>
}
