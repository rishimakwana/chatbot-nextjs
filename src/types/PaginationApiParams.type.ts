export type TPaginationApiParams = {
  skip: number
  limit: number
  sortOrder?: 'desc' | 'asc'
  searchByStatus?: string | string[]
  sortBy?: string
  searchVal?: string
}
