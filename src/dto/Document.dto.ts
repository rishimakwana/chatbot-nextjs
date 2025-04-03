import { TApiBase } from '@/types'

export type DocumentDTO = TApiBase & {
  file_name: string
  created_at: string
  document_type: {
    type: string
    icon_url: string
  }
}

