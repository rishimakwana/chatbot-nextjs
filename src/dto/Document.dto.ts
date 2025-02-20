import { TApiBase } from "@/types"


export type DocumentDTO = TApiBase & {
  file_name: string,
  created_at: string
}
