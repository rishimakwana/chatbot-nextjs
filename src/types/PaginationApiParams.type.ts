export type TPaginationApiParams = {
  page: number
  limit: number
  sortOrder?: 'desc' | 'asc'
  searchByStatus?: string | string[]
  sortBy?: string
  searchVal?: string
}
