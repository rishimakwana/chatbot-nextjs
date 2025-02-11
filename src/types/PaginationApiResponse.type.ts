export type TPaginationApiResponse<List> = {
  list: List[]
  currentPage: number
  totalCount: number
  totalItems: number
  totalPages: number
}
