export interface Message {
  type: 'user' | 'bot'
  content: string
  files?: string
  temp_link?: string | undefined
}